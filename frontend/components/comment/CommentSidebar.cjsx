SidebarComment = require './SidebarComment'
NewComment = require './NewComment'

module.exports = React.createClass
	render: ->
		comments = if @props.comments
			@props.comments.map (comment) =>
				<SidebarComment {...comment}/>
		else
			<div>Loading...</div>

		<div>
			<NewComment comments={@props.comments}/>
			{comments}
		</div>