ImageTagger = require './ImageTagger'
FileTagDetails = require './FileTagDetails'

module.exports = React.createClass
	getInitialState: ->
		appearances:
			1:
				id: 1
				position:
					x: 50
					y: 50
				size:
					x: 150
					y: 150
		selected_appearance: null

	selectAppearance: (id) ->
		@setState selected_appearance: id

	createAppearance: (appearance) ->
		@state.appearances[appearance.id] = appearance
		@setState appearances: @state.appearances

	render: ->
		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2">
				<FileTagDetails
				selected_appearance={@state.appearances[@state.selected_appearance]}
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
