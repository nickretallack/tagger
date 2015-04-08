{Link} = ReactRouter

module.exports = React.createClass
	render: ->
		<div className="main-image-container">
			<img className="main-image" src={@props.file_summary.image_url.val()}/>
		</div>