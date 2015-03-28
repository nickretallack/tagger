{RouteHandler, Route, DefaultRoute} = ReactRouter

module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired

	getId: ->
		@context.router.getCurrentParams().file_id

	ready: ->
		@props.cortex.search_results.val()? # and @props.cortex.file_details.hasKey @getId()

	getSummary: ->
		@props.cortex.search_results.find (item) -> item.id.val() is @getId()

	getDetails: ->
		@props.cortex.file_details[@getId()]

	render: ->
		<div>show file {@getId()}</div>

#		if not @ready()
#			return <div>Loading...</div>
#
#		<RouteHandler file_summary={@getSummary()} file_details={@getDetails()}>
