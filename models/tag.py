from character_tagger.models import db

__all__ = ['Tag','CharacterTag','FileCharacterTag','FileTag']

class Tag(db.Model):
	__tablename__ = 'tag'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, unique=True)

# relationships

class CharacterTag(db.Model):
	__tablename__ = 'character_tag'
	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag')

	character_id = db.Column('character_id', db.ForeignKey('character.id', ondelete='cascade'), primary_key=True)
	character = db.relationship('Character')

class FileCharacterTag(db.Model):
	__tablename__ = 'file_character_tag'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File')

	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag')

	character_id = db.Column('character_id', db.ForeignKey('character.id', ondelete='cascade'), primary_key=True)
	character = db.relationship('Character')

class FileTag(db.Model):
	__tablename__ = 'file_tag'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File')

	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag')

