CommentSidebar = require '../../comment/CommentSidebar'
comment_loader = require '../../../lib/comment_loader'
module.exports = React.createClass
	mixins: [comment_loader]

	render: ->
		src = @props.file_summary.image_url.val()
		image = <img className="main-image" src={src}/>
		comments = @getComments()

		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2 sidebar">
				<CommentSidebar comments={comments} />
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				{image}
			</div>
		</div>

