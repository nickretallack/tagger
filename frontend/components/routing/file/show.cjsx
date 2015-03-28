{Link, RouteHandler, Route, DefaultRoute} = ReactRouter

module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired

	getId: ->
		@context.router.getCurrentParams().file_id

	ready: ->
		@props.cortex.search_results.val()? # and @props.cortex.file_details.hasKey @getId()

	getSummary: ->
		id = @getId()
		@props.cortex.search_results.find (item) => item.id.val() is id

	getDetails: ->
		@props.cortex.file_details[@getId()]

	render: ->
		id = parseInt @getId()
		index = @props.cortex.search_results.findIndex (item) => item.id.val() is id
		summary = @props.cortex.search_results[index]
		next_summary = @props.cortex.search_results[index+1]
		previous_summary = @props.cortex.search_results[index-1]

		next_link = if next_summary
			<Link
			className="next-link"
			to="file show basic"
			params={{file_id: next_summary.id.val()}}
			>Next &rarr;</Link>

		previous_link = if previous_summary
			<Link
			className="previous-link"
			to="file show basic"
			params={{file_id: previous_summary.id.val()}}
			>&larr; Previous</Link>

		<div>
			<p className="next-prev-links">
			{previous_link}
			{next_link}
			</p>

			<p>
			<img className="main-image" src={summary.image_url.val()}/>
			</p>
		</div>

