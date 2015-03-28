from tagger.models import db

__all__ = ['Tag']

class Tag(db.Model):
	"""
	This is mostly what you'll be searching for.
	"""
	__tablename__ = 'tag'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, unique=True, nullable=False)

	@property
	def things(self):
		return [item.thing for item in self.thing_relationships]

	@property
	def files(self):
		return [item.file for item in self.file_relationships]

	@property
	def thing_files(self):
		from tagger.models import File, FileThing, Thing, ThingTag
		return db.session.query(File).join(FileThing).join(Thing).join(ThingTag).filter(
			ThingTag.tag == self
		).all()

