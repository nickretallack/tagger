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
	file = db.relationship('File', backref=db.backref('appearances', passive_deletes='all'))

	# optional
	thing_id = db.Column('thing_id', db.ForeignKey('thing.id', ondelete='cascade'))
	thing = db.relationship('Thing', backref=db.backref('appearances', passive_deletes='all'))

	# where is it
	position_x = db.Column(db.Integer, nullable=False)
	position_y = db.Column(db.Integer, nullable=False)
	size_x = db.Column(db.Integer, nullable=False)
	size_y = db.Column(db.Integer, nullable=False)

	@property
	def tag_names(self):
		return [delta_tag.tag.name for delta_tag in self.delta_tags if not delta_tag.negative]

	@property
	def negative_tag_names(self):
		return [delta_tag.tag.name for delta_tag in self.delta_tags if delta_tag.negative]

	@property
	def thing_name(self):
		if self.thing:
			return self.thing.name

	@property
	def position(self):
		return dict(
			x=self.position_x,
			y=self.position_y,
		)

	@position.setter
	def position(self, value):
		self.position_x = value['x']
		self.position_y = value['y']

	@property
	def size(self):
		return dict(
			x=self.size_x,
			y=self.size_y,
		)

	@size.setter
	def size(self, value):
		self.size_x = value['x']
		self.size_y = value['y']

	@property
	def dimensions(self):
		return dict(
			position=self.position,
			size=self.size,
		)

	@dimensions.setter
	def dimensions(self, value):
		self.position = value['position']
		self.size = value['size']