{Link, RouteHandler, Route, DefaultRoute} = ReactRouter

ThingLink = React.createClass
	render: ->
		<a href={"/thing/#{@props.name}"}>{@props.name}</a>

intersperse = require '../../../lib/intersperse'

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
		id = @getId()
		details = @props.cortex.file_details[id]
		if not details
			$.get "/api/file/#{id}/info", (result) =>
				@props.cortex.file_details.add id, result
		details

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

		details = @getDetails()
		details_node = if details
			artists = details.roles.artist.map (thing) =>
				<ThingLink name={thing.val()}/>
			artists = intersperse(artists, ', ')

			recipients = details.roles.recipient.map (thing) =>
				<ThingLink name={thing.val()}/>
			recipients = intersperse(recipients, ', ')

			appearances = []
			details.appearances.forEach (id, appearance) =>
				name = appearance.thing_name.val()
				if name
					appearances.push <ThingLink name={name}/>
			appearances = intersperse(appearances, ', ')

			role_nodes = []
			if artists.length
				role_nodes.push <div style={{display:'inline'}}>by {artists}</div>

			if recipients.length
				role_nodes.push <div style={{display:'inline'}}>for {recipients}</div>

			if appearances.length
				role_nodes.push <div style={{display:'inline'}}>featuring {appearances}</div>

			role_nodes = intersperse(role_nodes, ', ')

			<div style={{textAlign: 'center', position:'absolute',left:0,top:0,right:0}}>
				{role_nodes}
			</div>


		<div>
			<div className="next-prev-links">
			{previous_link}
			{next_link}
			{details_node}
			</div>

			<div style={{position:'relative', marginTop:10}}>
				<img className="main-image" src={summary.image_url.val()}/>
			</div>
		</div>

