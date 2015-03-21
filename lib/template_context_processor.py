from thing_tagger.models import Thing, Tag, db

def firsts(items):
	return [item[0] for item in items]

def context_processor():
	return dict(
		THING_NAMES=firsts(db.session.query(Thing.name)),
		TAG_NAMES=firsts(db.session.query(Tag.name)),
	)

def register(app):
	app.context_processor(context_processor)