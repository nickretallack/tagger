{Link, Navigation} = ReactRouter

vector_prop_shape =
	x: React.PropTypes.number
	y: React.PropTypes.number

module.exports = React.createClass
	propTypes:
		position:	React.PropTypes.shape vector_prop_shape
		size:		React.PropTypes.shape vector_prop_shape

	render: ->
		<Link to="appearance" params={{appearance_id:@props.id}}
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
