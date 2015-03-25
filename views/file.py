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

search_query = """
select file.*
from file
join appearance on appearance.file_id = file.id
where appearance.id in
(
    select appearance_id from
    (
        select
        appearance_id,
        count(*) as tag_count
        from (
            -- thing tags --
            select
            appearance.id as appearance_id,
            tag.name as tag_name
            from appearance
            join thing on appearance.thing_id = thing.id
            join thing_tag on thing_tag.thing_id = thing.id
            join tag on thing_tag.tag_id = tag.id

            union

            -- thing name --
            select
            appearance.id as appearance_id,
            thing.name as tag_name
            from appearance
            join thing on appearance.thing_id = thing.id

            union

            -- appearance tags --
            select
            appearance.id as appearance_id,
            tag.name as tag_name
            from appearance
            join appearance_tag on appearance_tag.appearance_id = appearance.id
            join tag on appearance_tag.tag_id = tag.id
            where appearance_tag.negative = 'f'

            except

            -- negative appearance tags --
            select
            appearance.id as appearance_id,
            tag.name as tag_name
            from appearance
            join appearance_tag on appearance_tag.appearance_id = appearance.id
            join tag on appearance_tag.tag_id = tag.id
            where appearance_tag.negative = 't'
        ) as calculated_appearance_tag
        where tag_name in :tags
        group by appearance_id
    ) as appearance_match
    where appearance_match.tag_count = :tag_count
)
"""

@blueprint.route('/')
@blueprint.route('/file', endpoint='list')
def index():
	search = request.values.get('search','').strip()
	if search:
		terms = set(search.split(','))

		raw_files = db.session.execute(search_query, params=dict(
			tags=tuple(terms),
			tag_count=len(terms)
		))
		files = [File(**raw_file) for raw_file in raw_files]

	else:
		raw_files = db.session.execute("""select * from file""")
		files = [File(**raw_file) for raw_file in raw_files]
		
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
	return render_template('file/show.html', file=record)

@blueprint.route('/file/<int:file_id>/delete', methods=['POST'], endpoint='delete')
def delete_file(file_id):
	record = db.session.query(File).filter_by(id=file_id).one()
	db.session.delete(record)
	db.session.commit()
	flash("Deleted a file")
	return redirect(url_for('file.list'))


