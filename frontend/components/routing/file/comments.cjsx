CommentSidebar = require '../../comment/CommentSidebar'
comment_loader = require '../../../lib/comment_loader'
file_id_mixin = require '../../../lib/file_id_mixin'
module.exports = React.createClass
	mixins: [comment_loader, file_id_mixin]

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

