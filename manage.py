#!/usr/bin/env python

from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from tagger.app_factory import create_app
from tagger.models import db

app = create_app()
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
	manager.run()