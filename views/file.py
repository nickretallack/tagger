import os
import hashlib
from flask import *
from werkzeug import secure_filename
from tagger.models import db, File, Thing, Appearance, Source
from sqlalchemy.exc import IntegrityError
from tagger.lib.iterators import firsts
import requests
from tagger.lib.tag.tag import parse_tags
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

general_search_query = """
select file.*
from
(
    select
    file_id,
    count(*) as tag_count
    from (
        -- thing name --
        select
        file.id as file_id,
        thing.name as tag_name
        from file
        join appearance on appearance.file_id = file.id
        join thing on appearance.thing_id = thing.id

        union

        -- thing tags --
        select
        file.id as file_id,
        tag.name as tag_name
        from file
        join appearance on appearance.file_id = file.id
        join thing on appearance.thing_id = thing.id
        join thing_tag on thing_tag.thing_id = thing.id
        join tag on thing_tag.tag_id = tag.id

        union

        -- appearance tags --
        select
        file.id as file_id,
        tag.name as tag_name
        from file
        join appearance on appearance.file_id = file.id
        join appearance_tag on appearance_tag.appearance_id = appearance.id
        join tag on appearance_tag.tag_id = tag.id
        where appearance_tag.negative = 'f'

        except

        -- negative appearance tags --
        select
        file.id as file_id,
        tag.name as tag_name
        from file
        join appearance on appearance.file_id = file.id
        join appearance_tag on appearance_tag.appearance_id = appearance.id
        join tag on appearance_tag.tag_id = tag.id
        where appearance_tag.negative = 't'
    ) as calculated_file_tag
    where tag_name in :tags
    group by file_id
) as file_match
join file
on file_match.file_id = file.id
where file_match.tag_count = :tag_count
"""

appearance_search_query = """
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
        having tag_count = :tag_count
    ) as appearance_match
)
"""

multiple_appearance_query = """
with calculated_appearance_tag as (
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
)
select file.*
from file
where file.id in
(
    select
    appearance.file_id as file_id
    from
    (
    	{appearance_stanzas}
    ) as appearance_match
    join appearance on appearance_match.appearance_id = appearance.id
    group by appearance.file_id
    having count(*) = 2
)
"""

appearance_query_stanza = """
    select
    appearance_id
    from calculated_appearance_tag
    where tag_name in :{tags_param}
    group by appearance_id
    having count(*) = :{tag_count_param}
"""

@blueprint.route('/')
@blueprint.route('/file', endpoint='list')
def index():
	search = request.values.get('search','')
	terms = parse_tags(search)
	if len(terms) == 0:
		query = """select * from file"""
		raw_files = db.session.execute(query)
	else:
		query = general_search_query
		raw_files = db.session.execute(query, params=dict(
			tags=tuple(terms),
			tag_count=len(terms)
		))

	files = [File(**raw_file) for raw_file in raw_files]
	return render_template('file/list.html', files=files, search=search)

def appearance_stanza_from_tags(tags, index, params):
	appearance_query_stanza.format(

	)

@blueprint.route('/advanced-search')
def advanced_search():
	# search_by_appearance = request.values.get('by_appearance') == 'true'
	# if search_by_apparance:
	# 	query = appearance_search_query

	appearance_tags = []
	for index in xrange(5):
		key = 'appearance_{}'.format(index)
		tags = parse_tags(request.values.get(key,''))
		if len(tags):
			appearance_tags.append(tags)
	if len(appearance_tags) == 0:
		files = []
	else:
		params = {}
		appearance_stanzas = []
		for index, tags in enumerate(appearance_tags):
			tags_param = "tags_{}".format(index)
			tag_count_param = "tag_count_{}".format(index)
			appearance_stanzas.append(appearance_query_stanza.format(
				tags_param=tags_param,
				tag_count_param=tag_count_param,
			))
			params[tags_param] = tuple(tags)
			params[tag_count_param] = len(tags)

		query = multiple_appearance_query.format(
			appearance_stanzas = " union ".join(appearance_stanzas)
		)
		raw_files = db.session.execute(query, params=params)
		files = [File(**raw_file) for raw_file in raw_files]

	return render_template('file/advanced_search.html', files=files)

@blueprint.route('/file/new', methods=['GET'], endpoint='new')
def new_file():
	return render_template('file/new.html')	

@blueprint.route('/file', methods=['POST'], endpoint='post')
def post_file():
	file = request.files.get('file')
	record = File()
	db.session.add(record)

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
		source = Source(
			file=record,
			url=url,
		)
		# hex_digest = hash_file(response.raw)

	record.ext = ext
	record.sha256 = hex_digest

	try:
		db.session.flush()
		flash("Uploaded a file.")
	except IntegrityError, error:
		db.session.rollback()
		# TODO: try and add a source?
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


