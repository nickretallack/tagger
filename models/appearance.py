from tagger.models import db

__all__ = ['Appearance']

class Appearance(db.Model):
	"""
	An appearance of a Thing in a File.
	The Thing doesn't have to be specified though.
	You can tag an appearance on its own, before the Thing it concerns is identified.
	"""
	__tablename__ = 'appearance'

	id = db.Column(db.Integer, primary_key=True)

	# required
	file_id = db.Column('file_id', db.ForeignKey('file.id', ondelete='cascade'), nullable=False)
	file = db.relationship('File', backref=db.backref('thing_relationships', passive_deletes='all'))

	# optional
	thing_id = db.Column('thing_id', db.ForeignKey('thing.id', ondelete='cascade'))
	thing = db.relationship('Thing', backref=db.backref('file_relationships', passive_deletes='all'))

