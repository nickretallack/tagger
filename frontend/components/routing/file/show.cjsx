{Link, RouteHandler, Route, DefaultRoute} = ReactRouter

ThingLink = React.createClass
	render: ->
		<a href={"/thing/#{@props.name}"}>{@props.name}</a>

intersperse = require '../../../lib/intersperse'
file_details_diff = require '../../../lib/file_details_diff'

module.exports = React.createClass
	displayName: 'file-show'
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
			$.get @getSyncUrl(), (file_details) =>
				@gotData file_details
		details

	contextTypes:
		router: React.PropTypes.func.isRequired

	getInitialState: ->
		saving: false
		error: false

	getFileId: ->
		@getId()
		#@props.file_summary.id.val()

	getSyncUrl: ->
		"/api/file/#{@getFileId()}/info"

	gotData: (file_details) ->
		id = @getId()
		console.log "GOT DATA", file_details
		if id of @props.cortex.file_details
			@props.cortex.file_details[id].set file_details
		else
			@props.cortex.file_details.add id, file_details

		@setState
			server_state: $.extend(true, {}, file_details)
			saving: false

	save: ->
		server_state = @state.server_state
		message = file_details_diff @getDetails(), server_state

		@setState
			saving: true
			error: false
		$.ajax
			type: 'post'
			contentType: 'application/json'
			dataType: 'json'
			url: @getSyncUrl()
			data: JSON.stringify message
			success: (response) =>
				{file, appearance_id_map} = response
				current_id = @context.router.getCurrentParams().appearance_id
				if current_id and current_id of appearance_id_map
					new_id = appearance_id_map[current_id]
					@context.router.transitionTo 'file appearance show',
						appearance_id: new_id
						file_id: @getId()
				@gotData file

			error: =>
				console.log arguments, "ERROR"
				@setState
					saving: false
					error: true


	render: ->
		id = parseInt @getId()
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

		details = @getDetails()
		#details_node = if details
		#	artists = details.roles.artist.map (thing) =>
		#		<ThingLink name={thing.val()}/>
		#	artists = intersperse(artists, ', ')
#
#		#	recipients = details.roles.recipient.map (thing) =>
#		#		<ThingLink name={thing.val()}/>
#		#	recipients = intersperse(recipients, ', ')
#
#		#	appearances = []
#		#	details.appearances.forEach (id, appearance) =>
#		#		name = appearance.thing_name.val()
#		#		if name
#		#			appearances.push <ThingLink name={name}/>
#		#	appearances = intersperse(appearances, ', ')
#
#		#	role_nodes = []
#		#	if artists.length
#		#		role_nodes.push <div style={{display:'inline'}}>by {artists}</div>
#
#		#	if recipients.length
#		#		role_nodes.push <div style={{display:'inline'}}>for {recipients}</div>
#
#		#	if appearances.length
#		#		role_nodes.push <div style={{display:'inline'}}>featuring {appearances}</div>
#
#		#	role_nodes = intersperse(role_nodes, ', ')
#
#		#	<div style={{textAlign: 'center', position:'absolute',left:0,top:0,right:0}}>
#		#		{role_nodes}
		#	</div>

		navigation = [
			<Link key="overview" to="file overview" params={{file_id:id}}>overview</Link>
			<Link key="details" to="file details" params={{file_id:id}}>details</Link>
			<Link key="appearances" to="file appearances" params={{file_id:id}}>appearances</Link>
			<Link key="comments" to="file comments" params={{file_id:id}}>comments</Link>
		]
		navigation = intersperse(navigation, ' | ')
		save_button = (
			<button className="btn btn-primary" onClick={@save}>Save</button>
		)

		<div>
			<div className="next-prev-links">
				{previous_link}
				{next_link}
				<div className="file-navigation">
					{navigation}
				</div>
			</div>

			<div className="main-image-container" style={{position:'relative', marginTop:10}}>
				<RouteHandler file_summary={summary} file_details={details} cortex={@props.cortex} save_button={save_button}/>
			</div>
		</div>

