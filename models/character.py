from character_tagger.models import db

__all__ = ['Character', 'FileCharacter']

class Character(db.Model):
	__tablename__ = 'character'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, unique=True)

	@property
	def files(self):
		return [item.file for item in self.file_relationships]

	@property
	def tag_names(self):
		return ",".join([item.tag.name for item in self.tag_relationships])


# relationships

class FileCharacter(db.Model):
	__tablename__ = 'file_character'
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), primary_key=True)
	character_id = db.Column('character_id', db.ForeignKey('character.id', ondelete='cascade'), primary_key=True)
	file = db.relationship('File', backref='character_relationships')
	character = db.relationship('Character', backref='file_relationships')
