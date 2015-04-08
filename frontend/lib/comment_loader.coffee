cortex_set_key = require './cortex_set_key'

module.exports =
	contextTypes:
		router: React.PropTypes.func.isRequired

	getFileId: ->
		@context.router.getCurrentParams().file_id

	commentsLoaded: ->
		@props.cortex.file_comments.hasKey @getFileId()

	componentDidMount: ->
		@loadComments()

	componentWillReceiveProps: ->
		@loadComments()

	getComments: ->
		comments = if @commentsLoaded()
			@props.cortex.file_comments[@getFileId()]
		else
			null

	loadComments: ->
		file_id = @getFileId()
		if not @commentsLoaded()
			$.ajax
				type: 'get'
				url:"/api/file/#{file_id}/comments"
				success: (response) =>
					cortex_set_key @props.cortex.file_comments, file_id, response.items
