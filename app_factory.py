from flask import Flask
from tagger.models import db

# views
from views import file, tag, thing

from tagger.lib import error_handlers
from tagger.lib import template_context_processor
from tagger.lib import log_handlers

def create_app():
	app = Flask(__name__)
	app.config.from_object('tagger.config')
	app.config.from_object('tagger.local_config')
	app.jinja_env.line_statement_prefix = '%'
	db.init_app(app)

	app.register_blueprint(file.blueprint)
	app.register_blueprint(tag.blueprint)
	app.register_blueprint(thing.blueprint)

	error_handlers.register(app)
	template_context_processor.register(app)
	log_handlers.register(app)

	return app