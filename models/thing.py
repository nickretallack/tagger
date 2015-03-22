from tagger.models import db

__all__ = ['Thing', 'FileThing']

class Thing(db.Model):
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


# relationships

class FileThing(db.Model):
	__tablename__ = 'file_thing'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File', backref=db.backref('thing_relationships', passive_deletes='all'))

	thing_id = db.Column('thing_id', db.ForeignKey('thing.id', ondelete='cascade'), primary_key=True)
	thing = db.relationship('Thing', backref=db.backref('file_relationships', passive_deletes='all'))

