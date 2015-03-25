from flask import *
from tagger.models import db, Thing, File, Appearance, AppearanceTag
from tagger.lib.tag.tag import ensure_tags_exist, normalize_tags
from tagger.lib.tag.thing import ensure_thing

blueprint = Blueprint('api',__name__)

@blueprint.route('/thing/<thing_name>/tag', methods=['GET'])
def get_thing_tags(thing_name):
	thing = db.session.query(Thing).filter_by(name=thing_name).options(
		db.subqueryload('tag_relationships').joinedload('tag')
	).one()
	return jsonify(items=thing.tag_name_list)

def tag_appearance(appearance, add_tags, add_negative_tags):
	tags_by_name = ensure_tags_exist(add_tags.union(add_negative_tags))
	for tag_name in add_tags:
		tag = tags_by_name[tag_name]
		tagging = AppearanceTag(
			appearance=appearance,
			tag=tag,
		)

	for tag_name in add_negative_tags:
		tag = tags_by_name[tag_name]
		tagging = AppearanceTag(
			appearance=appearance,
			tag=tag,
			negative=True,
		)
		db.session.add(tagging)

def tag_new_appearance(file, item):
	appearance = Appearance(
		file=file,
		dimensions=item['dimensions'],
	)
	db.session.add(appearance)

	# thing
	appearance.thing = ensure_thing(item.get('thing_name'))

	# tags
	add_tags = normalize_tags(item.get('tags',[]))
	add_negative_tags = normalize_tags(item.get('negative_tags',[]))
	tag_appearance(appearance, add_tags, add_negative_tags)
	return appearance

def update_appearance(appearance, data):	
	if 'new_thing_name' in data:
		appearance.thing = ensure_thing(data['new_thing_name'])

	if 'dimensions' in data:
		appearance.dimensions = data['dimensions']

	add_tags = normalize_tags(data.get('add_tags',[]))
	remove_tags = normalize_tags(data.get('remove_tags',[]))
	add_negative_tags = normalize_tags(data.get('add_negative_tags',[]))
	remove_negative_tags = normalize_tags(data.get('remove_negative_tags',[]))

	tag_names = set(appearance.tag_names)
	negative_tag_names = set(appearance.negative_tag_names)

	# don't double apply tags
	# add_tags = add_tags.difference(tag_names)
	# add_negative_tags = add_negative_tags.difference(negative_tag_names)

	# remove tags
	for tagging in appearance.taggings:
		name = tagging.tag.name
		if tagging.negative:
			if name in remove_negative_tags:
				db.session.delete(tagging)
		else:
			if name in remove_tags:
				db.session.delete(tagging)

	# add tags
	tag_appearance(appearance, add_tags, add_negative_tags)


@blueprint.route('/file/<file_id>/info', methods=['POST'], endpoint='file_info_sync')
def file_info_sync(file_id):
	file = db.session.query(File).filter_by(id=file_id).options(
		db.subqueryload('appearances').subqueryload('taggings').joinedload('tag')
	).one()
	data = request.get_json()

	appearances = data.get('appearances',None)
	if appearances:
		for item in appearances.get('create',[]):
			tag_new_appearance(file, item)

		updates = appearances.get('update',{})
		if len(updates):
			updatables = db.session.query(Appearance).filter(
				Appearance.file == file,
				Appearance.id.in_(updates.keys())
			).all()
			for updatable in updatables:
				update_appearance(updatable, updates[str(updatable.id)])

		deletes = set(map(int,appearances.get('delete',[])))
		for appearance in file.appearances:
			if appearance.id in deletes:
				db.session.delete(appearance)

	db.session.commit()
	return jsonify(file_json(file))

def appearance_json(appearance):
	return dict(
		id=appearance.id,
		thing_name=appearance.thing_name,
		dimensions=appearance.dimensions,
		tags=list(appearance.tag_names),
		negative_tags=list(appearance.negative_tag_names),
	)

def file_json(file):
	return dict(
		appearances={appearance.id: appearance_json(appearance) for appearance in file.appearances},
	)


@blueprint.route('/file/<file_id>/info', methods=['GET'], endpoint="file_info_get")
def file_info_get(file_id):
	file = db.session.query(File).filter_by(id=file_id).one()
	return jsonify(file_json(file))





