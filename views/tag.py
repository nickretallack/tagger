from flask import *
from character_tagger.models import db, File, Character
from character_tagger.lib import tagging

blueprint = Blueprint('tag',__name__)

@blueprint.route('/file/<int:file_id>/tag', methods=['POST'], endpoint='file')
def tag_file(file_id):
	file = db.session.query(File).filter_by(id=file_id)\
	.options(db.subqueryload('tag_relationships').joinedload('tag'))\
	.one()

	wanted_tag_names = set(request.form['tags'].split(','))
	wanted_character_names = set(request.form['characters'].split(','))
	tagging.file_apply_tags(file, wanted_tag_names)
	tagging.file_apply_characters(file, wanted_character_names)
	db.session.commit()

	return redirect(url_for('file.show', file_id=file_id))

@blueprint.route('/character/<int:character_id>/tag', methods=['POST'], endpoint='character')
def tag_character(character_id):
	character = db.session.query(Character).filter_by(id=character_id)\
	.options(db.subqueryload('tag_relationships').joinedload('tag'))\
	.one()

	wanted_tag_names = set(request.form['tags'].split(','))
	tagging.character_apply_tags(character, wanted_tag_names)
	db.session.commit()

	return redirect(url_for('character.show', character_id=character_id))
