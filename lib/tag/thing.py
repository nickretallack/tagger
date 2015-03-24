from tagger.models import db, Thing, ThingTag
from flask import request, flash
from tag import ensure_tags, parse_tags

def request_tag_thing(thing):
	if 'tags' in request.form:
		wanted_tag_names = parse_tags(request.form['tags'])
		thing_apply_tags(thing, wanted_tag_names)

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

def ensure_thing(name):
	if not name:
		return None
		
	thing = db.session.query(Thing).filter(
		Thing.name == name
	).first()
	if thing is None:
		thing = Thing(
			name=name
		)
		db.session.add(thing)
	return thing

