from flask import Flask
from character_tagger.models import db

# views
from views import file, tag

from character_tagger.lib.error_handlers import register_error_handlers

def create_app():
	app = Flask(__name__)
	app.config.from_object('character_tagger.config')
	app.config.from_object('character_tagger.local_config')
	app.jinja_env.line_statement_prefix = '%'
	db.init_app(app)

	app.register_blueprint(file.blueprint)
	app.register_blueprint(tag.blueprint)
	# app.register_blueprint(pages.blueprint)

	register_error_handlers(app)

	return app