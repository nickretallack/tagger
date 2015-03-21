from flask import *
from flask.ext.sqlalchemy import SQLAlchemy
from character_tagger.models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost:5432/character_tagger'
app.config['FILE_FOLDER'] = 'static/files'
app.jinja_env.line_statement_prefix = '%'
app.config['READ_BLOCK_SIZE'] = 16384
db.init_app(app)

from views import file
app.register_blueprint(file.blueprint)


@app.route('/')
def index():
	return render_template('index.html', files=[])




if __name__ == '__main__':
	app.run(debug=True)