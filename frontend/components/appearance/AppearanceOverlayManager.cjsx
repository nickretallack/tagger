V = require '../../lib/vector'
{Navigation} = ReactRouter
AppearanceOverlay = require './AppearanceOverlay'
#vector_prop_shape = require '../../lib/vector_shape'

random_integer = (min, max) ->
	Math.floor(Math.random() * (max - min)) + min

module.exports = React.createClass
	displayName: 'AppearanceOverlayManager'
	contextTypes:
		router: React.PropTypes.func.isRequired
#	propTypes:
#		appearances: React.PropTypes.arrayOf React.PropTypes.shape
#			dimensions: React.PropTypes.shape
#				position:	React.PropTypes.shape vector_prop_shape
#				size:		React.PropTypes.shape vector_prop_shape

	getInitialState: ->
		creating_overlay: null

	onClickImage: (event) ->
		{offsetX, offsetY} = event.nativeEvent
		mouse_position = V offsetX, offsetY
		size = V 150, 150
		position = mouse_position.subtract size.scale 0.5

		dimensions =
			position:
				x:position.x
				y:position.y
			size:
				x:size.x
				y:size.y

		id = "new-#{random_integer 0, Math.pow(2,31)}"
		appearance = {id, dimensions, tags:[], negative_tags:[], thing_name:null}
		@props.appearances.add appearance.id, appearance
		@context.router.transitionTo 'appearance',
				appearance_id: id

	render: ->
		console.log @props.appearances.val()

		appearances = []
		@props.appearances.forEach (id, appearance) ->
			appearances.push <AppearanceOverlay key={appearance.id.val()} {...appearance}/>

		<div style={{position:'relative'}}>
			<img
			src={@props.src}
			style={{position:'absolute', zIndex: 1}}
			onClick={@onClickImage}
			/>
			<div style={{position:'absolute', zIndex: 2}}>
				{appearances}
			</div>
		</div>