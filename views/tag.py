from flask import *
from tagger.models import db, File, Thing
from tagger.lib import tagging

blueprint = Blueprint('tag',__name__)

def parse_tags(string):
	if not string:
		return set()
	else:
		return set(string.split(','))

@blueprint.route('/file/<int:file_id>/tag', methods=['POST'], endpoint='file')
def tag_file(file_id):
	file = db.session.query(File).filter_by(id=file_id)\
	.options(db.subqueryload('tag_relationships').joinedload('tag'))\
	.one()

	if 'tags' in request.form:
		wanted_tag_names = parse_tags(request.form['tags'])
		tagging.file_apply_tags(file, wanted_tag_names)

	if 'things' in request.form:
		wanted_thing_names = parse_tags(request.form['things'])
		tagging.file_apply_things(file, wanted_thing_names)

	db.session.commit()

	return redirect(url_for('file.show', file_id=file_id))

@blueprint.route('/thing/<int:thing_id>/tag', methods=['POST'], endpoint='thing')
def tag_thing(thing_id):
	thing = db.session.query(Thing).filter_by(id=thing_id)\
	.options(db.subqueryload('tag_relationships').joinedload('tag'))\
	.one()

	wanted_tag_names = parse_tags(request.form['tags'])
	tagging.thing_apply_tags(thing, wanted_tag_names)
	db.session.commit()

	return redirect(url_for('thing.show', thing_id=thing_id))
