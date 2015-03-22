import logging
import os

def register(app):
	file_handler = logging.FileHandler(os.path.join(app.config['LOG_DIR'],'error.log'))
	file_handler.setLevel(logging.WARNING)
	app.logger.addHandler(file_handler)