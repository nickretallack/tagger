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
		creating_overlay: null

	onClickImage: (event) ->
		{offsetX, offsetY} = event.nativeEvent
		mouse_position = V offsetX, offsetY
		size = V 150, 150
		position = mouse_position.subtract size.scale 0.5
		id = random_integer 0, Math.pow(2,31)
		appearance = {size, position, id}
		@props.createAppearance appearance

	render: ->
		appearances = for id,appearance of @props.appearances
			<AppearanceOverlay key={appearance.id} selectAppearance={@props.selectAppearance} {...appearance}/>

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