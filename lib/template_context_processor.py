from thing_tagger.models import Thing, Tag, db
from thing_tagger.lib.iterators import firsts

def context_processor():
	return dict(
		THING_NAMES=firsts(db.session.query(Thing.name)),
		TAG_NAMES=firsts(db.session.query(Tag.name)),
	)

def register(app):
	app.context_processor(context_processor)