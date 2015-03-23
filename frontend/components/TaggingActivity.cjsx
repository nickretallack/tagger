ImageTagger = require './ImageTagger'
FileTagDetails = require './FileTagDetails'


random_integer = (min, max) ->
	Math.floor(Math.random() * (max - min)) + min

module.exports = React.createClass
	getInitialState: ->
		appearances: {}
#			1:
#				id: 1
#				position:
#					x: 50
#					y: 50
#				size:
#					x: 150
#					y: 150
#				thing: 'test'
		selected_appearance: null

	unSelectAppearance: ->
		@setState selected_appearance: null

	selectAppearance: (id) ->
		@setState selected_appearance: id

	removeAppearance: (id) ->
		delete @state.appearances[id]
		@setState appearances: @state.appearances



	createAppearance: (location) ->
		appearance = location
		appearance.tags = []

		id = random_integer 0, Math.pow(2,31)
		appearance.id = "new-#{id}"

		@state.appearances[appearance.id] = appearance
		@setState
			appearances: @state.appearances
			selected_appearance: appearance.id

	render: ->
		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2">
				<FileTagDetails
				selected_appearance={@state.appearances[@state.selected_appearance]}
				unSelectAppearance={@unSelectAppearance}
				removeAppearance={@removeappearance}
				selectThing={@selectThing}
				/>
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				<ImageTagger
				src={IMAGE_URL}
				selectAppearance={@selectAppearance}
				createAppearance={@createAppearance}
				appearances={@state.appearances}
				/>
			</div>
		</div>
