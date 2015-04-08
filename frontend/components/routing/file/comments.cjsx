CommentSidebar = require '../../comment/CommentSidebar'
comment_loader = require '../../../lib/comment_loader'
file_id_mixin = require '../../../lib/file_id_mixin'
SidebarLayout = require '../../SidebarLayout'

module.exports = React.createClass
	mixins: [comment_loader, file_id_mixin]

	render: ->
		src = @props.file_summary.image_url.val()
		image = <img className="main-image" src={src}/>
		comments = @getComments()

		sidebar = <CommentSidebar comments={comments} />
		<SidebarLayout sidebar={sidebar} main={image}/>

