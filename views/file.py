import os
import hashlib
from flask import *
from werkzeug import secure_filename
from thing_tagger.models import db, File, Tag, Thing, FileTag, FileThing, ThingTag
from sqlalchemy.exc import IntegrityError
from thing_tagger.lib.iterators import firsts

blueprint = Blueprint('file',__name__)

def hash_file(file):
	hash = hashlib.sha256()
	while True:
		block = file.stream.read(current_app.config['READ_BLOCK_SIZE'])
		if not block:
			break
		hash.update(block)

	file.seek(0)
	return hash

@blueprint.route('/')
@blueprint.route('/file', endpoint='list')
def index():
	search = request.values.get('search','').strip()
	if search:
		terms = set(search.split(','))

		# Find all things that match the query
		thing_ids = firsts(db.session.execute("""
			select tagged_thing.id
			from
			(
				select 
				thing.id,
				count(*) as tag_count

				from thing
				join thing_tag on thing_tag.thing_id = thing.id
				join tag on tag.id = thing_tag.tag_id
				where tag.name in :tags
				group by thing.id
			) as tagged_thing
			where tagged_thing.tag_count = :tag_count
		""", dict(
				tag_count=len(terms),
				tags=tuple(terms),
			)
		))

		# Find all files that have at least one of those things
		files = db.session.query(File).join(FileThing).filter(
			FileThing.thing_id.in_(thing_ids)
		).all()
	else:
		files = db.session.query(File).all()
		
	return render_template('index.html', files=files, search=search)

@blueprint.route('/file', methods=['POST'], endpoint='post')
def post_file():
	file = request.files['file']
	filename = secure_filename(file.filename)
	original_name, ext = os.path.splitext(filename)
	hex_digest = hash_file(file).hexdigest()

	record = File(
		ext=ext,
		sha256=hex_digest,
	)
	db.session.add(record)

	try:
		db.session.flush()
	except IntegrityError:
		db.session.rollback()
		flash("We already have that file.")
		return redirect(url_for('.list'))

	file.save(os.path.join(current_app.config['FILE_FOLDER'], record.filename))
	db.session.commit()
	return redirect(url_for('.show', file_id=record.id))

	# file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
	# return redirect(url_for('uploaded_file',
	# 						filename=filename))	

@blueprint.route('/file/<int:file_id>', methods=['GET'], endpoint='show')
def show_file(file_id):
	record = db.session.query(File).filter_by(id=file_id).one()

	return render_template('file.html', file=record)