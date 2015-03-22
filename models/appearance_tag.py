from tagger.models import db

__all__ = ['AppearanceTag']

class AppearanceTag(db.Model):
	"""
	This associates tags with Appearances of Things.
	Since a Thing already has tags, this also allows you to 'anti-tag'
	those things in specific appearances to prevent their usual tags from
	cascading in.
	"""

	__tablename__ = 'appearance_tag'

	appearance_id = db.Column('appearance_id', db.ForeignKey('appearance.id', ondelete='cascade'), primary_key=True)
	appearance = db.relationship('Appearance', backref=db.backref("delta_tags", passive_deletes='all'))

	tag_id = db.Column('tag_id', db.ForeignKey('tag.id', ondelete='cascade'), primary_key=True)
	tag = db.relationship('Tag', backref=db.backref("file_thing_relationships", passive_deletes='all'))

	is_anti_tag = db.Column(db.Boolean, nullable=False, server_default='f')
