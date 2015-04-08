file_id_mixin = require './file_id_mixin'
cortex_set_key = require './cortex_set_key'
file_details_diff = require './file_details_diff'

module.exports =
	mixins: [file_id_mixin]
	contextTypes:
		router: React.PropTypes.func.isRequired

	getId: ->
		@getFileId()

	getSummary: ->
		id = @getId()
		@props.cortex.search_results.find (item) => item.id.val() is id

	detailsLoaded: ->
		@props.cortex.file_details.hasKey @getFileId()

	componentDidMount: ->
		@loadDetails()

	componentWillReceiveProps: ->
		@loadDetails()

	loadDetails: ->
		if not @detailsLoaded()
			$.get @getSyncUrl(), (file_details) =>
				@gotData file_details

	getDetails: ->
		if @detailsLoaded()
			@props.cortex.file_details[@getFileId()]

	getInitialState: ->
		saving: false
		error: false

	getSyncUrl: ->
		"/api/file/#{@getFileId()}/info"

	gotData: (file_details) ->
		id = @getId()
		console.log "GOT DATA", file_details
		file_details_clone = $.extend true, {}, file_details
		if id of @props.cortex.file_details
			@props.cortex.file_details[id].set file_details
			@props.cortex.server_file_details[id].set file_details_clone
		else
			@props.cortex.file_details.add id, file_details
			@props.cortex.server_file_details.add id, file_details_clone

	saveDetails: ->
		id = @getId()
		server_state = @props.cortex.server_file_details[id].val()
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
				@setState
					saving: false


			error: =>
				console.log arguments, "ERROR"
				@setState
					saving: false
					error: true

