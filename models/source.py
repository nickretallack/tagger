from tagger.models import db

__all__ = ['Source']

class Source(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	url = db.Column(db.String, nullable=False)

	file_id = db.Column(db.ForeignKey('file.id'), nullable=False)
	file = db.relationship('File', backref='sources')