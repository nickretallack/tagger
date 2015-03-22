from tagger.models import db

__all__ = ['Thing']

class Thing(db.Model):
	"""
	Could be a person, character, or object.
	It's like a tag that can have its own tags attached to it.
	You associate it with a file using an Appearance.
	"""
	__tablename__ = 'thing'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, unique=True)

	@property
	def files(self):
		return [item.file for item in self.file_relationships]

	@property
	def tags(self):
		return [item.tag for item in self.tag_relationships]

	@property
	def tag_name_list(self):
		return [item.name for item in self.tags]

	@property
	def tag_names(self):
		return ",".join(self.tag_name_list)
