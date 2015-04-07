from blueprint import blueprint

from flask import jsonify
from tagger.models import db, Thing

@blueprint.route('/thing/<thing_name>/tag', methods=['GET'])
def get_thing_tags(thing_name):
	thing = db.session.query(Thing).filter_by(name=thing_name).options(
		db.subqueryload('tag_relationships').joinedload('tag')
	).one()
	return jsonify(items=thing.tag_name_list)
