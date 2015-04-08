CommentSidebar = require '../../comment/CommentSidebar'
module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired

	getFileId: ->
		@context.router.getCurrentParams().file_id

	commentsLoaded: ->
		@props.cortex.file_comments.hasKey @getFileId()

	componentDidMount: ->
		file_id = @context.router.getCurrentParams().file_id
		if not @commentsLoaded()
			$.ajax
				type: 'get'
				url:"/api/file/#{file_id}/comments"
				success: (response) =>
#					if not @commentsLoaded
					@props.cortex.file_comments.add file_id, response.items
#					else
#						if @props.cortex.file_comments[file_id].set comments

	render: ->
		src = @props.file_summary.image_url.val()
		image = <img className="main-image" src={src}/>

		comments = if @commentsLoaded()
			@props.cortex.file_comments[@getFileId()]
		else
			null

		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2 sidebar">
				<CommentSidebar comments={comments}/>
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				{image}
			</div>
		</div>

