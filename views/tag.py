from flask import *
from character_tagger.models import FileTag, Tag, File, db

blueprint = Blueprint('tag',__name__)

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

@blueprint.route('/file/<int:file_id>/tag', methods=['POST'], endpoint='file')
def tag_file(file_id):
	file = db.session.query(File).filter_by(id=file_id)\
	.options(db.subqueryload('tag_relationships').joinedload('tag'))\
	.one()

	applied_tags = file.tag_relationships

	wanted_tag_names = set(request.form['tags'].split(','))
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

	db.session.commit()
	if len(new_tag_names):
		flash("Created tags: {}".format(", ".join(new_tag_names)))
	if len(tag_names_to_add):
		flash("Tagged as: {}".format(", ".join(tag_names_to_add)))
	if len(tag_names_to_remove):
		flash("Untagged as: {}".format(", ".join(tag_names_to_remove)))
	return redirect(url_for('file.show', file_id=file_id))


	# # existing_tag_names = set([item.name for item in existing_tags])






	# for tag in existing_tags:
	# 	tag_names.remove(tag.name)

	# for tag_name in tag_names:
	# 	tag = Tag(
	# 		name=tag_name
	# 	)
	# 	db.session.add(tag)

	# applied_tags = file.tag_relationships
	# applied_tag_ids = set()
	# for tag_relationship in applied_tags:
	# 	applied_tag_names.add(tag_relationship.tag_id)

	# # apply the new tags

	# 	FileTag


	# import pdb; pdb.set_trace()
	# # file = db.session.query(File).filter_by(id=file_id).one()
	# pass