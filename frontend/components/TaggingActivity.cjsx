AppearanceOverlayManager = require './appearance/AppearanceOverlayManager'
{RouteHandler} = ReactRouter

module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired

	getInitialState: ->
		saving: false
		error: false

	componentDidMount: ->
		console.log "GETTING"
		$.ajax
			type: 'get'
			dataType: 'json'
			url: @props.sync_url
			success: (file_data) =>
				@gotData file_data
			error: =>
				console.log "ERROR", arguments

	gotData: (file_data) ->
		@props.file.set(file_data)
		@setState
			server_state: $.extend(true, {}, file_data)
			saving: false

	save: ->
		# todo: diff it
		server_state = @state.server_state

		new_appearances = []
		updated_appearances = {}
		@props.file.appearances.forEach (key, appearance) ->
			appearance = appearance.val()
			if key[0...4] is 'new-'
				new_appearances.push appearance
			else
				old_appearance = server_state.appearances[key]
				if _.isEqual(old_appearance, appearance)
					return

				delta = {}

				new_thing_name = appearance.thing_name
				if new_thing_name != old_appearance.thing_name
					delta.new_thing_name = new_thing_name

				delta.add_tags = _.difference(appearance.tags, old_appearance.tags)
				delta.remove_tags = _.difference(old_appearance.tags, appearance.tags)
				delta.add_negative_tags = _.difference(appearance.negative_tags, old_appearance.negative_tags)
				delta.remove_negative_tags = _.difference(old_appearance.negative_tags, appearance.negative_tags)
				updated_appearances[key] = delta

		removed_appearances = _.difference(_.keys(server_state.appearances), @props.file.appearances.keys())

		message =
			appearances:
				create: new_appearances
				delete: removed_appearances
				update: updated_appearances

		@setState
			saving: true
			error: false
		$.ajax
			type: 'post'
			contentType: 'application/json'
			dataType: 'json'
			url: @props.sync_url
			data: JSON.stringify message
			success: (file_data) =>
				@gotData file_data

			error: =>
				console.log arguments, "ERROR"
				@setState
					saving: false
					error: true

	render: ->
		error = if @state.error
			<div>Failed to save.  Try again?</div>

		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2">
				<button disabled={@state.saving} onClick={@save} className="btn btn-primary pull-right">Save All Changes and Reload</button>
				{error}
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

