from tagger.models import db, Tag
from flask import flash
from tagger.lib.iterators import index_by_attribute

def parse_tags(string):
	if not string:
		return set()
	else:
		return set([item.lower() for item in string.split(',')])

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

	if len(new_tag_names):
		flash("Created tags: {}".format(", ".join(new_tag_names)))

	return existing_tags, tags_by_name, new_tag_names
