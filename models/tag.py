from thing_tagger.models import db

__all__ = ['Tag','ThingTag','FileThingTag','FileTag']

class Tag(db.Model):
	__tablename__ = 'tag'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, unique=True)

# relationships

class ThingTag(db.Model):
	__tablename__ = 'thing_tag'
	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag', backref='thing_relationships')

	thing_id = db.Column('thing_id', db.ForeignKey('thing.id', ondelete='cascade'), primary_key=True)
	thing = db.relationship('Thing', backref='tag_relationships')

class FileThingTag(db.Model):
	__tablename__ = 'file_thing_tag'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File', backref="thing_tag_relationships")

	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag', backref="file_thing_relationships")

	thing_id = db.Column('thing_id', db.ForeignKey('thing.id', ondelete='cascade'), primary_key=True)
	thing = db.relationship('Thing', backref="file_tag_relationships")

class FileTag(db.Model):
	__tablename__ = 'file_tag'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File', backref="tag_relationships")

	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag', backref="file_relationships")

