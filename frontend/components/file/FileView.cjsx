{Link} = ReactRouter

module.exports = React.createClass
	render: ->
		<div>
			<img
			src={@props.file_summary.image_url}
			/>
		</div>