from tagger.models import db

__all__ = ['Comment']

class Comment(db.Model):
	__tablename__ = 'comment'

	id = db.Column(db.Integer, primary_key=True)
	text = db.Column(db.String, nullable=False)

	parent_id = db.Column(db.ForeignKey('comment.id', ondelete='cascade')) # in reply to
	parent = db.relationship('Comment', remote_side=[id], backref=db.backref('replies', passive_deletes='all'))

	# what it's related to.  Only one may be populated
	file_id = db.Column(db.ForeignKey('file.id', ondelete='cascade'), nullable=False) # nullability will change
	file = db.relationship('File', backref=db.backref('comments', passive_deletes='all'))