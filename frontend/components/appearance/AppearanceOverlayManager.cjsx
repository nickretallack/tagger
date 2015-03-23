V = require '../../lib/vector'
{Navigation} = ReactRouter
AppearanceOverlay = require './AppearanceOverlay'

random_integer = (min, max) ->
	Math.floor(Math.random() * (max - min)) + min

module.exports = React.createClass
	mixins: [Navigation]

	getInitialState: ->
		creating_overlay: null

	onClickImage: (event) ->
		{offsetX, offsetY} = event.nativeEvent
		mouse_position = V offsetX, offsetY
		size = V 150, 150
		position = mouse_position.subtract size.scale 0.5

		id = "new-#{random_integer 0, Math.pow(2,31)}"
		appearance = {id, size, position, tags:[], negative_tags:[], thing_name:null}
		@props.appearances.add appearance.id, appearance
		@context.router.transitionTo 'appearance',
				appearance_id: id

	render: ->
		appearances = for id,appearance of @props.appearances.val()
			<AppearanceOverlay key={appearance.id} {...appearance}/>

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