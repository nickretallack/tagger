{Link, Navigation} = ReactRouter
vector_prop_shape = require '../../lib/vector_shape'

module.exports = React.createClass
	displayName: 'AppearanceOverlay'
	contextTypes:
		router: React.PropTypes.func.isRequired
#	propTypes:
#		id: React.PropTypes.string.isRequired
#		dimensions: React.PropTypes.shape
#			position:	React.PropTypes.shape vector_prop_shape
#			size:		React.PropTypes.shape vector_prop_shape

	onMouseDown: (event) ->
		event.preventDefault()
		event.stopPropagation()
		touch_point = 
			x: event.nativeEvent.offsetX
			y: event.nativeEvent.offsetY

		@props.startDrag @props.dimensions.position, touch_point

	render: ->
		<Link to="file appearance" params={{appearance_id:@props.id.val(), file_id:@context.router.getCurrentParams().file_id}}
		className="tagger-overlay"
		draggable="true"
		onMouseDown={@onMouseDown}
		style={{
			position:'absolute',
			left:@props.dimensions.position.x.val(),
			top:@props.dimensions.position.y.val(),
			width:@props.dimensions.size.x.val(),
			height:@props.dimensions.size.y.val(),
			cursor:'move',
		}}
		/>
