from flask import *

blueprint = Blueprint('tag',__name__)

@blueprint.route('/file/<int:file_id>/tag', methods=['POST'], endpoint='file')
def tag_file(file_id):
	pass