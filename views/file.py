import os
import hashlib
from flask import *
from werkzeug import secure_filename
from character_tagger.models import db, File
from sqlalchemy.exc import IntegrityError

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
	files = db.session.query(File).all()
	return render_template('index.html', files=files)

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