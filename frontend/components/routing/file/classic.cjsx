ClassicComments = require '../../comment/CommentSidebar'
comment_loader = require '../../../lib/comment_loader'

module.exports = React.createClass
	mixins: [comment_loader]
	render: ->
		src = @props.file_summary.image_url.val()
		image = (
			<div className="main-image-container">
				<img className="main-image" src={src}/>
			</div>
		)
		comments = @getComments()

		<div>
			{image}
			<ClassicComments comments={comments}/>
		</div>