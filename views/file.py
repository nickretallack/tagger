import os
import hashlib
from flask import *
from werkzeug import secure_filename
from tagger.models import db, File, Thing, Appearance
from sqlalchemy.exc import IntegrityError
from tagger.lib.iterators import firsts
import requests
# from tagger.lib import tagging

blueprint = Blueprint('file',__name__)

def write_file(content, path):
	with open(path,'wb') as file:
		file.write(content)

def hash_file(file):
	hash = hashlib.sha256()
	while True:
		block = file.read(current_app.config['READ_BLOCK_SIZE'])
		if not block:
			break
		hash.update(block)

	file.seek(0)
	return hash

@blueprint.route('/')
@blueprint.route('/file', endpoint='list')
def index():
	search = request.values.get('search','').strip()
	# if search:
	# 	terms = set(search.split(','))

	# 	# Find all things that match the query
	# 	thing_ids = firsts(db.session.execute("""
	# 		select tagged_thing.id
	# 		from
	# 		(
	# 			select 
	# 			thing.id,
	# 			count(*) as tag_count

	# 			from thing
	# 			join thing_tag on thing_tag.thing_id = thing.id
	# 			join tag on tag.id = thing_tag.tag_id
	# 			where tag.name in :tags
	# 			group by thing.id
	# 		) as tagged_thing
	# 		where tagged_thing.tag_count = :tag_count
	# 	""", dict(
	# 			tag_count=len(terms),
	# 			tags=tuple(terms),
	# 		)
	# 	))

	# 	# Find all files that have at least one of those things
	# 	if len(thing_ids):
	# 		files = db.session.query(File).join(Appearance).filter(
	# 			FileThing.thing_id.in_(thing_ids)
	# 		).all()
	# 	else:
	# 		files = []
	# else:
	files = db.session.query(File).all()
		
	return render_template('file/list.html', files=files, search=search)

@blueprint.route('/file/new', methods=['GET'], endpoint='new')
def new_file():
	return render_template('file/new.html')	

@blueprint.route('/file', methods=['POST'], endpoint='post')
def post_file():
	file = request.files.get('file')

	if file:
		file = request.files['file']
		filename = secure_filename(file.filename)
		_, ext = os.path.splitext(filename)
		hex_digest = hash_file(file).hexdigest()

	else:
		url = request.form.get('url')
		if not url:
			abort(400)

		_, ext = os.path.splitext(url)
		response = requests.get(url, stream=True)
		hex_digest = hashlib.sha256(response.content).hexdigest()
		# hex_digest = hash_file(response.raw)

	record = File(
		ext=ext,
		sha256=hex_digest,
	)
	db.session.add(record)

	try:
		db.session.flush()
		flash("Uploaded a file.")
	except IntegrityError:
		db.session.rollback()
		flash("We already have that file.")
		return redirect(url_for('.list'))

	# tagging.request_tag_file(record)

	path = os.path.join(current_app.config['FILE_FOLDER'], record.filename)
	if file:
		file.save(path)
	else:
		write_file(response.content, path)

	db.session.commit()
	return redirect(url_for('.show', file_id=record.id))

@blueprint.route('/file/<int:file_id>', methods=['GET'], endpoint='show')
def show_file(file_id):
	record = db.session.query(File).filter_by(id=file_id).one()

	return render_template('file/show.html', file=record) #, delta_tags=tagging.get_delta_tags)

@blueprint.route('/file/<int:file_id>/delete', methods=['POST'], endpoint='delete')
def delete_file(file_id):
	record = db.session.query(File).filter_by(id=file_id).one()
	db.session.delete(record)
	db.session.commit()
	flash("Deleted a file")
	return redirect(url_for('file.list'))


