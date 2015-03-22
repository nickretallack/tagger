from tagger.models import db

__all__ = ['File']


class File(db.Model):
	"""
	Usually an image, but could be anything.
	The purpose of this application is to tag the appearances of things in files,
	so this is the primary model.
	"""
	__tablename__ = 'file'
	id = db.Column(db.Integer, primary_key=True)
	sha256 = db.Column(db.String, nullable=False, unique=True)
	ext = db.Column(db.String, nullable=False)

	@property
	def filename(self):
		return "{}{}".format(self.sha256, self.ext)

	@property
	def things(self):
		return [item.thing for item in self.thing_relationships]

	@property
	def tags(self):
		return [item.tag for item in self.tag_relationships]

	@property
	def tag_name_list(self):
		return [item.name for item in self.tags]

	@property
	def tag_names(self):
		return ",".join(self.tag_name_list)

	@property
	def thing_names(self):
		return ",".join([item.name for item in self.things])
