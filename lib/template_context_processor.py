from character_tagger.models import Character, Tag, db
def context_processor():
	return dict(
		CHARACTER_NAMES=zip(*db.session.query(Character.name))[0],
		TAG_NAMES=zip(*db.session.query(Tag.name))[0],
	)

def register(app):
	app.context_processor(context_processor)