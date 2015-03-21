from flask import Flask
from thing_tagger.models import db

# views
from views import file, tag, thing

from thing_tagger.lib import error_handlers
from thing_tagger.lib import template_context_processor

def create_app():
	app = Flask(__name__)
	app.config.from_object('thing_tagger.config')
	app.config.from_object('thing_tagger.local_config')
	app.jinja_env.line_statement_prefix = '%'
	db.init_app(app)

	app.register_blueprint(file.blueprint)
	app.register_blueprint(tag.blueprint)
	app.register_blueprint(thing.blueprint)

	error_handlers.register(app)
	template_context_processor.register(app)

	return app