from tagger.models import db, Tag, Thing, FileTag, ThingTag, FileThing, FileThingTag
from flask import flash, request
import re

key_pattern = re.compile("thing-(?P<thing_id>\d+)-tags")

def parse_tags(string):
	if not string:
		return set()
	else:
		return set(string.split(','))

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



def request_tag_thing(thing):
	if 'tags' in request.form:
		wanted_tag_names = parse_tags(request.form['tags'])
		thing_apply_tags(thing, wanted_tag_names)

def index_by_attribute(items, attribute):
	result = {}
	for item in items:
		result[getattr(item, attribute)] = item
	return result		

def ensure_tags(wanted_tag_names):
	existing_tags = db.session.query(Tag).filter(
		Tag.name.in_(wanted_tag_names)
	).all()

	tags_by_name = index_by_attribute(existing_tags, 'name')
	new_tag_names = wanted_tag_names - set(tags_by_name.keys())
	for name in new_tag_names:
		tag = Tag(
			name=name
		)
		db.session.add(tag)
		tags_by_name[name] = tag

	return existing_tags, tags_by_name, new_tag_names

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

def thing_apply_tags(thing, wanted_tag_names):
	applied_tags = thing.tag_relationships

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
		item = ThingTag(
			thing=thing,
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

def ensure_things(wanted_tag_names):
	existing_tags = db.session.query(Thing).filter(
		Thing.name.in_(wanted_tag_names)
	).all()

	tags_by_name = index_by_attribute(existing_tags, 'name')
	new_tag_names = wanted_tag_names - set(tags_by_name.keys())
	for name in new_tag_names:
		tag = Thing(
			name=name
		)
		db.session.add(tag)
		tags_by_name[name] = tag

	return existing_tags, tags_by_name, new_tag_names

def file_apply_things(file, wanted_tag_names):
	applied_tags = file.thing_relationships

	applied_tag_names = set([item.thing.name for item in applied_tags])
	tag_names_to_add = wanted_tag_names - applied_tag_names
	tag_names_to_remove = applied_tag_names - wanted_tag_names

	"""
	I need to apply this delta.  This will invole creating new Tags, and
	also adding/removing FileTag records.
	"""
	existing_tags, tags_by_name, new_tag_names = ensure_things(wanted_tag_names)

	for name in tag_names_to_add:
		tag = tags_by_name[name]
		item = FileThing(
			file=file,
			thing=tag,
		)
		db.session.add(item)

	for item in applied_tags:
		if item.thing.name in tag_names_to_remove:
			db.session.delete(item)

	db.session.flush()
	if len(new_tag_names):
		flash("Created things: {}".format(", ".join(new_tag_names)))
	if len(tag_names_to_add):
		flash("Tagged with things: {}".format(", ".join(tag_names_to_add)))
	if len(tag_names_to_remove):
		flash("Untagged with things: {}".format(", ".join(tag_names_to_remove)))

