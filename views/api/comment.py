from blueprint import blueprint

from flask import jsonify, request
from tagger.models import db, Comment, File
from sqlalchemy.exc import IntegrityError

@blueprint.route('/file/<int:file_id>/comments')
def get_comments(file_id):
	file = db.session.query(File).filter_by(id=file_id).options(db.subqueryload('comments')).one()
	return jsonify(comment_list_json(file.comments))

def comment_list_json(comments):
	return dict(
		items=[comment_json(comment) for comment in comments]
	)

def comment_json(comment):
	return dict(
		text=comment.text,
		author=None,
	)

@blueprint.route('/file/<int:file_id>/comments', methods=['POST'])
def post_comment(file_id):
	text = request.values['text']
	parent_id = request.values.get('parent_id')

	file = db.session.query(File).filter_by(id=file_id).one()

	comment = Comment(
		file=file,
		text=text,
		parent_id=parent_id,
	)
	db.session.add(comment)

	try:
		db.session.commit()
	except IntegrityError, error:
		abort(400)

	return jsonify(comment_list_json(file.comments)), 201
