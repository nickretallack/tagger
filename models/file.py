from character_tagger.models import db

__all__ = ['File']

# This is the primary resource.  Everything else attaches to it.
class File(db.Model):
	__tablename__ = 'file'
	id = db.Column(db.Integer, primary_key=True)
	sha256 = db.Column(db.String, nullable=False, unique=True)
	ext = db.Column(db.String, nullable=False)

	@property
	def filename(self):
		return "{}{}".format(self.sha256, self.ext)

	@property
	def tag_names(self):
		return ",".join([item.tag.name for item in self.tag_relationships])

	@property
	def character_names(self):
		return ",".join([item.character.name for item in self.character_relationships])
