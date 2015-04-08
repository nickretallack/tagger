cortex_set_key = require './cortex_set_key'

module.exports =
	commentsLoaded: ->
		@props.cortex.file_comments.hasKey @getFileId()

	componentDidMount: ->
		@loadComments()

	componentWillReceiveProps: ->
		@loadComments()

	getComments: ->
		if @commentsLoaded()
			@props.cortex.file_comments[@getFileId()]

	loadComments: ->
		file_id = @getFileId()
		if not @commentsLoaded()
			$.ajax
				type: 'get'
				url:"/api/file/#{file_id}/comments"
				success: (response) =>
					cortex_set_key @props.cortex.file_comments, file_id, response.items
