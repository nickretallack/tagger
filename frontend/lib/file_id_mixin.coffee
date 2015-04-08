module.exports =
	contextTypes:
		router: React.PropTypes.func.isRequired

	getFileId: ->
		@context.router.getCurrentParams().file_id
