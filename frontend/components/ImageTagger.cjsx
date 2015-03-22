V = require '../lib/vector'

random_integer = (min, max) ->
	Math.floor(Math.random() * (max - min)) + min

vector_prop_shape =
	x: React.PropTypes.number
	y: React.PropTypes.number

AppearanceOverlay = React.createClass
	propTypes:
		position:	React.PropTypes.shape vector_prop_shape
		size:		React.PropTypes.shape vector_prop_shape

	onClick: (event) ->
		@props.selectAppearance @props.id

	render: ->
		<div
		className="tagger-overlay"
		onClick={@onClick}
		style={{
			position:'absolute',
			left:@props.position.x,
			top:@props.position.y,
			width:@props.size.x,
			height:@props.size.y,
		}}
		/>

module.exports = React.createClass
	getInitialState: ->
		overlays: [
			{
				position:
					x: 50
					y: 50
				size:
					x: 150
					y: 150
				id: 1
			}
		]
		creating_overlay: null

	onClickImage: (event) ->
		{offsetX, offsetY} = event.nativeEvent
		mouse_position = V offsetX, offsetY
		size = V 150, 150
		position = mouse_position.subtract size.scale 0.5
		id = random_integer 0, Math.pow(2,31)
		overlay = {size, position, id}
		@setState
			overlays: @state.overlays.concat [overlay]

	render: ->
		overlays = for overlay in @state.overlays
			<AppearanceOverlay key={overlay.id} selectAppearance={@props.selectAppearance} {...overlay}/>

		<div style={{position:'relative'}}>
			<img
			src={@props.src}
			style={{position:'absolute', zIndex: 1}}
			onClick={@onClickImage}
			/>
			<div style={{position:'absolute', zIndex: 2}}>
				{overlays}
			</div>
		</div>