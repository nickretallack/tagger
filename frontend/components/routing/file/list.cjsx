{RouteHandler, Route, DefaultRoute} = ReactRouter
ThumbnailList = require '../../ThumbnailList'

module.exports = React.createClass
	render: ->
		<ThumbnailList files={@props.cortex.search_results}/>
