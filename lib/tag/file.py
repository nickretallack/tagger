def request_tag_file(file):
	if 'things' in request.form:
		wanted_thing_names = parse_tags(request.form['things'])
		file_apply_things(file, wanted_thing_names)

	if 'tags' in request.form:
		wanted_tag_names = parse_tags(request.form['tags'])
		file_apply_tags(file, wanted_tag_names)

	for key in request.form:
		match = key_pattern.match(key)
		if match:
			thing_id = int(match.group('thing_id'))
			thing = db.session.query(Thing).filter_by(id=thing_id).one()
			tags = parse_tags(request.form[key])
			apply_delta_tags(file, thing, tags)

def file_apply_tags(file, wanted_tag_names):
	applied_tags = file.tag_relationships

	applied_tag_names = set([item.tag.name for item in applied_tags])
	tag_names_to_add = wanted_tag_names - applied_tag_names
	tag_names_to_remove = applied_tag_names - wanted_tag_names

	"""
	I need to apply this delta.  This will invole creating new Tags, and
	also adding/removing FileTag records.
	"""
	existing_tags, tags_by_name, new_tag_names = ensure_tags(wanted_tag_names)

	for name in tag_names_to_add:
		tag = tags_by_name[name]
		item = FileTag(
			file=file,
			tag=tag,
		)
		db.session.add(item)

	for item in applied_tags:
		if item.tag.name in tag_names_to_remove:
			db.session.delete(item)

	db.session.flush()
	if len(new_tag_names):
		flash("Created tags: {}".format(", ".join(new_tag_names)))
	if len(tag_names_to_add):
		flash("Tagged as: {}".format(", ".join(tag_names_to_add)))
	if len(tag_names_to_remove):
		flash("Untagged as: {}".format(", ".join(tag_names_to_remove)))

# 