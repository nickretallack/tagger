ImageTagger = require './ImageTagger'
FileTagDetails = require './FileTagDetails'
{RouteHandler, Navigation} = ReactRouter

random_integer = (min, max) ->
	Math.floor(Math.random() * (max - min)) + min

module.exports = React.createClass
	mixins: [Navigation]

	selectAppearance: (id) ->
		@transitionTo 'appearance',
				appearance_id: id

	removeAppearance: (id) ->
		delete @props.cortex.appearances.destroy id
		@context.router.transitionTo 'file details'

	createAppearance: (location) ->
		appearance = location
		appearance.tags = []
		appearance.negative_tags = []
		appearance.thing_name = null
		id = random_integer 0, Math.pow(2,31)
		appearance.id = "new-#{id}"

		#@props.cortex.appearances[appearance.id] = appearance
		@props.cortex.appearances.add appearance.id, appearance
		@selectAppearance appearance.id
		#setTimeout =>
		#, 1000
		#@props.cortex.selected_appearance.set appearance.id
		#@setState
		#	appearances: @props.cortex.appearances
		#	selected_appearance: appearance.id

	render: ->
		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2">
				<RouteHandler
				cortex={@props.cortex}
				key={@context.router.getCurrentParams().appearance_id}
				removeAppearance={@removeAppearance}
				/>
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				<ImageTagger
				src={IMAGE_URL}
				createAppearance={@createAppearance}
				appearances={@props.cortex.appearances.getValue()}
				/>
			</div>
		</div>

