from flask import *
from tagger.models import db, File, Thing, Tag
from tagger.lib import tagging

blueprint = Blueprint('tag',__name__)

@blueprint.route('/file/<int:file_id>/tag', methods=['POST'], endpoint='file')
def tag_file(file_id):
	file = db.session.query(File).filter_by(id=file_id)\
	.options(db.subqueryload('tag_relationships').joinedload('tag'))\
	.one()

	tagging.request_tag_file(file)
	db.session.commit()

	return redirect(url_for('file.show', file_id=file_id))

@blueprint.route('/thing/<int:thing_id>/tag', methods=['POST'], endpoint='thing')
def tag_thing(thing_id):
	thing = db.session.query(Thing).filter_by(id=thing_id)\
	.options(db.subqueryload('tag_relationships').joinedload('tag'))\
	.one()

	tagging.request_tag_thing(thing)
	db.session.commit()

	return redirect(url_for('thing.show', thing_id=thing_id))

@blueprint.route('/tag', methods=['GET'], endpoint='list')
def list_tags():
	tags = db.session.query(Tag).all()
	return render_template("tag/list.html", tags=tags)