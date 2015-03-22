def get_delta_tags(file, thing):
	thing_tag_names = set(thing.tag_name_list)

	delta_tags = db.session.query(FileThingTag).filter_by(
		file=file,
		thing=thing,
	).all()

	for delta_tag in delta_tags:
		name = delta_tag.tag.name
		if delta_tag.is_anti_tag:
			thing_tag_names.remove(name)
		else:
			thing_tag_names.add(name)

	return ",".join(thing_tag_names)

def apply_delta_tags(file, thing, wanted_tags):
	thing_tags = set(thing.tag_name_list)
	wanted_positive_deltas = wanted_tags - thing_tags
	wanted_negative_deltas = thing_tags - wanted_tags

	delta_tags = db.session.query(FileThingTag).filter_by(
		file=file,
		thing=thing,
	).options(db.joinedload('tag')).all()

	removed_negative_tag_names = set()
	removed_positive_tag_names = set()

	# delete unwanted deltas
	for delta_tag in delta_tags:
		name = delta_tag.tag.name
		if not delta_tag.is_anti_tag:
			if name not in wanted_tags:
				db.session.delete(delta_tag)
				removed_positive_tag_names.add(name)
			else:
				wanted_positive_deltas.remove(name)
		else:
			if name in wanted_tags:
				db.session.delete(delta_tag)
				removed_negative_tag_names.add(name)
			else:
				wanted_negative_deltas.remove(name)

	# ensure tags exist
	existing_tags, tags_by_name, new_tag_names = ensure_tags(wanted_tags.union(thing_tags))


	for tag_name in wanted_positive_deltas:
		tag = tags_by_name[tag_name]
		item = FileThingTag(
			file=file,
			thing=thing,
			tag=tag,
		)
		db.session.add(item)

	for tag_name in wanted_negative_deltas:
		tag = tags_by_name[tag_name]
		item = FileThingTag(
			file=file,
			thing=thing,
			tag=tag,
			is_anti_tag=True,
		)
		db.session.add(item)

	db.session.flush()
	if len(new_tag_names):
		flash("Created tags: {}".format(", ".join(new_tag_names)))

	if len(wanted_positive_deltas):
		flash("Tagged this appearance of {} as: {}".format(thing.name, ", ".join(wanted_positive_deltas)))
	if len(wanted_negative_deltas):
		flash("Anti-Tagged this appearance of {} as: {}".format(thing.name, ", ".join(wanted_negative_deltas)))

	if len(removed_positive_tag_names):
		flash("Untagged this appearance of {} as: {}".format(thing.name, ", ".join(removed_positive_tag_names)))
	if len(removed_negative_tag_names):
		flash("Un-Anti-tagged this appearance of {} as: {}".format(thing.name, ", ".join(removed_negative_tag_names)))
