{Link, RouteHandler, Route, DefaultRoute} = ReactRouter
intersperse = require '../../../lib/intersperse'
file_id_mixin = require '../../../lib/file_id_mixin'

module.exports = React.createClass
	mixins: [file_id_mixin]
	displayName: 'file-show'
	render: ->
		id = parseInt @getFileId()
		index = @props.cortex.search_results.findIndex (item) => item.id.val() is id
		summary = @props.cortex.search_results[index]
		next_summary = @props.cortex.search_results[index+1]
		previous_summary = @props.cortex.search_results[index-1]

		route = @context.router.getCurrentRoutes()[1].name
		next_link = if next_summary
			<Link
			className="next-link"
			to={route}
			params={{file_id: next_summary.id.val()}}
			>Next &rarr;</Link>

		previous_link = if previous_summary
			<Link
			className="previous-link"
			to={route}
			params={{file_id: previous_summary.id.val()}}
			>&larr; Previous</Link>

		navigation = [
			<Link key="classic" to="file classic" params={{file_id:id}}>classic</Link>
			<Link key="overview" to="file overview" params={{file_id:id}}>image</Link>
			<Link key="details" to="file details" params={{file_id:id}}>details</Link>
			<Link key="appearances" to="file appearances" params={{file_id:id}}>appearances</Link>
			<Link key="comments" to="file comments" params={{file_id:id}}>comments</Link>
		]
		navigation = intersperse(navigation, ' | ')

		<div>
			<div className="next-prev-links">
				{previous_link}
				{next_link}
				<div className="file-navigation">
					{navigation}
				</div>
			</div>

			<div style={{position:'relative', marginTop:10}}>
				<RouteHandler file_summary={summary} cortex={@props.cortex}/>
			</div>
		</div>

