from flask import *
from tagger.models import Thing, db
from sqlalchemy.exc import IntegrityError
from tagger.lib import tagging

blueprint = Blueprint('thing',__name__)

@blueprint.route('/thing', methods=['POST'], endpoint='create')
def create_thing():
	name = request.form['name']
	if not name:
		abort(400)

	thing = Thing(
		name=name,
	)
	db.session.add(thing)

	tagging.request_tag_thing(thing)

	try:
		db.session.commit()
		flash("Created a thing: {}".format(name))
	except IntegrityError:
		db.session.rollback()
		thing = db.session.query(Thing).filter_by(
			name=name
		).one()
		flash("A thing by that name alredy exists.")

	return redirect(url_for('thing.show', thing_id=thing.id))

@blueprint.route('/thing', endpoint='list')
def list_things():
	things = db.session.query(Thing).all()
	return render_template('thing/list.html', things=things)

@blueprint.route('/thing/<int:thing_id>', endpoint="show")
def show_thing(thing_id):
	thing = db.session.query(Thing).filter_by(id=thing_id).one()
	return render_template('thing/show.html', thing=thing)

@blueprint.route('/thing/new', endpoint='new')
def new_thing():
	return render_template('thing/new.html')

@blueprint.route('/thing/<int:thing_id>/delete', methods=['POST'], endpoint='delete')
def delete_thing(thing_id):
	record = db.session.query(Thing).filter_by(id=thing_id).one()
	db.session.delete(record)
	db.session.commit()
	flash("Deleted a thing")
	return redirect(url_for('thing.list'))
