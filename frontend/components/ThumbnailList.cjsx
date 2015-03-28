{Link} = ReactRouter

module.exports = React.createClass
	render: ->
		thumbs = @props.files.map (file) ->
			<Link
			className="file thumbnail"
			to="file show"
			params={{file_id: file.id.val()}}
			style={{backgroundImage: "url('#{file.image_url.val()}')"}}
			></Link>

		<div>
			{thumbs}
		</div>