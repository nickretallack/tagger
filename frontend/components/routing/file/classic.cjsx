ClassicComments = require '../../comment/CommentSidebar'
comment_loader = require '../../../lib/comment_loader'
file_details_loader = require '../../../lib/file_details_loader'
file_id_mixin = require '../../../lib/file_id_mixin'
ThingLink = require '../../ThingLink'
intersperse = require '../../../lib/intersperse'

module.exports = React.createClass
	mixins: [comment_loader, file_details_loader, file_id_mixin]
	render: ->
		src = @props.file_summary.image_url.val()
		image = (
			<div className="main-image-container">
				<img className="main-image" src={src}/>
			</div>
		)
		comments = @getComments()

		details = @getDetails()
		details_node = if details
			artists = details.roles.artist.map (thing) =>
				<ThingLink name={thing.val()}/>
			artists = intersperse(artists, ', ')

			recipients = details.roles.recipient.map (thing) =>
				<ThingLink name={thing.val()}/>
			recipients = intersperse(recipients, ', ')

			appearances = []
			details.appearances.forEach (id, appearance) =>
				name = appearance.thing_name.val()
				if name
					appearances.push <ThingLink name={name}/>
			appearances = intersperse(appearances, ', ')

			role_nodes = []
			if artists.length
				role_nodes.push <div style={{display:'inline'}}>by {artists}</div>

			if recipients.length
				role_nodes.push <div style={{display:'inline'}}>for {recipients}</div>

			if appearances.length
				role_nodes.push <div style={{display:'inline'}}>featuring {appearances}</div>

			role_nodes = intersperse(role_nodes, ', ')

			<div>
				{role_nodes}
			</div>

		<div>
			{image}

			<p>
			{details_node}
			</p>

			<h2>Comments</h2>
			<ClassicComments comments={comments}/>
		</div>