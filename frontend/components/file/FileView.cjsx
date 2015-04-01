{Link} = ReactRouter

module.exports = React.createClass
	render: ->
		<div>
			<img className="main-image" src={@props.file_summary.image_url.val()}/>
		</div>