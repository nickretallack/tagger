from tagger.models import db

__all__ = ['File','FileTag','FileThingRole','ThingRole']


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
	def tags(self):
		return [item.tag for item in self.tag_relationships]

	@property
	def tag_names(self):
		return [item.name for item in self.tags]

	@property
	def artist_names(self):
		return [item.name for item in self.thing_roles if item.role.name == 'artist']

	@property
	def recipient_names(self):
		return [item.name for item in self.thing_roles if item.role.name == 'recipient']

class FileTag(db.Model):
	__tablename__ = 'file_tag'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File', backref=db.backref("tag_relationships", passive_deletes='all'))

	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag', backref=db.backref("file_relationships", passive_deletes='all'))

class FileThingRole(db.Model):
	__tablename__ = 'file_thing_role'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File', backref=db.backref("thing_roles", passive_deletes='all'))

	thing_id = db.Column('thing_id', db.ForeignKey('thing.id', ondelete='cascade'), primary_key=True)
	thing = db.relationship('Thing', backref=db.backref('file_roles', passive_deletes='all'))

	role_id = db.Column(db.ForeignKey('thing_role.id'), primary_key=True)
	role = db.relationship('ThingRole')

class ThingRole(db.Model):
	__tablename__ = 'thing_role'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, nullable=False, unique=True)
