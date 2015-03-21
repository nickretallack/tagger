from flask import *
from character_tagger.models import Character, db
from sqlalchemy.exc import IntegrityError

blueprint = Blueprint('character',__name__)

@blueprint.route('/character', methods=['POST'], endpoint='create')
def create_character():
	name = request.form['name']
	if not name:
		abort(400)

	character = Character(
		name=name,
	)
	db.session.add(character)

	try:
		db.session.commit()
	except IntegrityError:
		character = db.session.query(Character).filter_by(
			name=name
		).one()
		flash("A character by that name alredy exists.")

	return redirect(url_for('character.show', character.id))

@blueprint.route('/character', endpoint='list')
def list_characters():
	characters = db.session.query(Character).all()
	return render_template('character_list.html', characters=characters)

@blueprint.route('/character/<int:character_id>', endpoint="show")
def show_character(character_id):
	character = db.session.query(Character).filter_by(id=character_id).one()
	return render_template('character_list.html', character=character)
