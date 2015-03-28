from tagger.models import db

__all__ = ['Thing','ThingTag']

class Thing(db.Model):
	"""
	Could be a person, character, or object.
	It's like a tag that can have its own tags attached to it.
	You associate it with a file using an Appearance.
	"""
	__tablename__ = 'thing'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, unique=True, nullable=False)

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

class ThingTag(db.Model):
	__tablename__ = 'thing_tag'
	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag', backref=db.backref('thing_relationships', passive_deletes='all'))

	thing_id = db.Column('thing_id', db.ForeignKey('thing.id', ondelete='cascade'), primary_key=True)
	thing = db.relationship('Thing', backref=db.backref('tag_relationships', passive_deletes='all'))
