from flask import Flask
from character_tagger.models import db

# views
from views import file

def create_app():
	app = Flask(__name__)
	app.config.from_object('character_tagger.')
	app.jinja_env.line_statement_prefix = '%'
	db.init_app(app)

	app.register_blueprint(file.blueprint)
	# app.register_blueprint(pages.blueprint)
