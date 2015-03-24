from flask import *
from tagger.models import db, Thing, File, Appearance
from tagger.lib.tag.tag import ensure_tags, normalize_tags
from tagger.lib.tag.thing import ensure_thing

blueprint = Blueprint('api',__name__)

@blueprint.route('/thing/<thing_name>/tag', methods=['GET'])
def get_thing_tags(thing_name):
	thing = db.session.query(Thing).filter_by(name=thing_name).options(
		db.subqueryload('tag_relationships').joinedload('tag')
	).one()
	return jsonify(items=thing.tag_name_list)

def tag_new_appearance(file, item):
	appearance = Appearance(
		file=file,
		position=item['position'],
		size=item['size'],
	)
	db.session.add(appearance)

	# thing
	thing_name = item.get('thing_name')
	if thing_name:
		thing = ensure_thing(thing_name)
	else:
		thing = None
	appearance.thing = thing

	# tags
	tags = normalize_tags(item.get('tags',[]))
	negative_tags = normalize_tags(item.get('negative_tags',[]))
	tags_by_name = ensure_tags(tags.union(negative_tags))

	for tag_name in tags:
		tag = tags_by_name[tag_name]
		taggin = AppearanceTag(
			appearance=appearance,
			tag=tag,
		)
		db.session.add(tagging)

	for tag_name in negative_tags:
		tag = tags_by_name[tag_name]
		tagging = AppearanceTag(
			appearance=appearance,
			tag=tag,
			is_anti_tag=True,
		)
		db.session.add(tagging)

	return appearance

@blueprint.route('/file/<file_id>/info', methods=['POST'], endpoint='file_info_sync')
def file_info_sync(file_id):
	file = db.session.query(File).filter_by(id=file_id).one()
	data = request.get_json()

	appearances = data.get('appearances',None)
	if appearances:
		for item in appearances.get('create',[]):
			tag_new_appearance(file, item)

	db.session.commit()
	return jsonify({"ok":True})

def appearance_json(appearance):
	return dict(
		id=appearance.id,
		thing_name=appearance.thing_name,
		position=appearance.position,
		size=appearance.size,
		tags=appearance.tag_names,
		negative_tags=appearance.negative_tag_names,
	)

def file_json(file):
	return dict(
		appearances={appearance.id: appearance_json(appearance) for appearance in file.appearances},
	)


@blueprint.route('/file/<file_id>/info', methods=['GET'], endpoint="file_info_get")
def file_info_get(file_id):
	file = db.session.query(File).filter_by(id=file_id).one()
	return jsonify(file_json(file))





