AppearanceOverlayManager = require './appearance/AppearanceOverlayManager'
{RouteHandler} = ReactRouter

module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired

	componentDidMount: ->
		console.log "GETTING"
		$.ajax
			type: 'get'
			#dataType: 'application/json'
			url: @props.sync_url
			success: (data) =>
				console.log "GOT", data
				@props.file.set(data)
			error: =>
				console.log "ERROR", arguments

	save: ->
		# todo: diff it

		new_appearances = []
		@props.file.appearances.forEach (key, appearance) ->
			if key[0...4] is 'new-'
				new_appearances.push appearance.val()

		message =
			appearances:
				create: new_appearances

		$.ajax
			type: 'post'
			contentType: 'application/json'
			dataType: 'application/json'
			url: @props.sync_url
			data: JSON.stringify message

	render: ->
		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2">
				<button onClick={@save} className="btn btn-primary">Save Changes</button>
				<RouteHandler
				cortex={@props.cortex}
				appearances={@props.file.appearances}
				key={@context.router.getCurrentParams().appearance_id}
				removeAppearance={@removeAppearance}
				/>
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				<AppearanceOverlayManager
				src={IMAGE_URL}
				createAppearance={@createAppearance}
				appearances={@props.file.appearances}
				/>
			</div>
		</div>

