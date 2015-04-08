AppearanceOverlayManager = require './AppearanceOverlayManager'

module.exports = React.createClass
	render: ->
		<div className="main-image-container">
			<AppearanceOverlayManager
				src={@props.file_summary.image_url.val()}
				appearances={@props.file_details?.appearances}
			/>
		</div>
