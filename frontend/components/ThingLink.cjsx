module.exports = React.createClass
	render: ->
		<a href={"/thing/#{@props.name}"}>{@props.name}</a>
