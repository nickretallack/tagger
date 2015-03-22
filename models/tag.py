from tagger.models import db

__all__ = ['Tag','ThingTag','FileThingTag','FileTag']

class Tag(db.Model):
	__tablename__ = 'tag'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, unique=True)

# relationships

class ThingTag(db.Model):
	__tablename__ = 'thing_tag'
	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag', backref=db.backref('thing_relationships', passive_deletes='all'))

	thing_id = db.Column('thing_id', db.ForeignKey('thing.id', ondelete='cascade'), primary_key=True)
	thing = db.relationship('Thing', backref=db.backref('tag_relationships', passive_deletes='all'))

class FileThingTag(db.Model):
	__tablename__ = 'file_thing_tag'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File', backref=db.backref("thing_tag_relationships", passive_deletes='all'))

	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag', backref=db.backref("file_thing_relationships", passive_deletes='all'))

	thing_id = db.Column('thing_id', db.ForeignKey('thing.id', ondelete='cascade'), primary_key=True)
	thing = db.relationship('Thing', backref=db.backref("file_tag_relationships", passive_deletes='all'))

class FileTag(db.Model):
	__tablename__ = 'file_tag'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File', backref=db.backref("tag_relationships", passive_deletes='all'))

	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag', backref=db.backref("file_relationships", passive_deletes='all'))

