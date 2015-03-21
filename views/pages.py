from flask import *

blueprint = Blueprint('pages',__name__)

@blueprint.route('/')
def index():
	return render_template('index.html', files=[])
