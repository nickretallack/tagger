from sqlalchemy.orm.exc import NoResultFound
from flask import Response

def not_found(exception):
	return Response("404 Not Found", status=404)

def register_error_handlers(app):
	app.errorhandler(NoResultFound)(not_found)