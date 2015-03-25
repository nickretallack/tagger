{Link, Navigation} = ReactRouter
vector_prop_shape = require '../../lib/vector_shape'

module.exports = React.createClass
	displayName: 'AppearanceOverlay'
#	propTypes:
#		id: React.PropTypes.string.isRequired
#		dimensions: React.PropTypes.shape
#			position:	React.PropTypes.shape vector_prop_shape
#			size:		React.PropTypes.shape vector_prop_shape

#	onDragStart: (event) ->
#		event.preventDefault()
#		@setState
#			click_origin:
#				x: event.nativeEvent.offsetX
#				y: event.nativeEvent.offsetY
#
#	onDrag: (event) ->
#		event.preventDefault()
#		#console.log "HUH"
#		#console.log event.nativeEvent, "DRAG"
#		position = @props.dimensions.position.val()
#		position.x = @state.click_origin.x + event.nativeEvent.offsetX
#		position.y = @state.click_origin.y + event.nativeEvent.offsetY
#		#console.log position.x, position.y
#		@props.dimensions.position.x.set(position.x)
#		@props.dimensions.position.y.set(position.y)
#
#	onDragEnd: (event) ->
#		event.preventDefault()
#
#	onMouseMove: (event) ->
#		console.log 'move', event

	render: ->
		#console.log @props.dimensions.position.x.val()
		<Link to="appearance" params={{appearance_id:@props.id.val()}}
		className="tagger-overlay"
		style={{
			position:'absolute',
			left:@props.dimensions.position.x.val(),
			top:@props.dimensions.position.y.val(),
			width:@props.dimensions.size.x.val(),
			height:@props.dimensions.size.y.val(),
		}}
		/>
