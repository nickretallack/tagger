from flask import *
from werkzeug import secure_filename
from character_tagger.models import File
import os
import hashlib

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
@blueprint.route('/file')
def index():
	return render_template('index.html', files=[])

@blueprint.route('/file', methods=['POST'])
def post_file():
	file = request.files['file']
	filename = secure_filename(file.filename)
	original_name, ext = os.path.splitext(filename)
	hex_digest = hash_file(file).hexdigest()
	new_name = "{}.{}".format(hex_digest, ext)

	record = File(
		ext=ext,
		sha256=hex_digest,
	)
	db.session.add(record)
	db.session.flush()

	file.save(os.path.join(current_app.config['FILE_FOLDER'], new_name))
	db.session.commit()
	return redirect(url_for('show_file',id=record.id))

	# file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
	# return redirect(url_for('uploaded_file',
	# 						filename=filename))	

@blueprint.route('/file/<int:file_id>', methods=['POST'])
def show_file(file_id):
	record = db.session.query(File).filter_by(id=file_id).one()

	return render_template('file.html', record=record)