AppearanceOverlayManager = require './AppearanceOverlayManager'
file_details_loader = require '../../lib/file_details_loader'
file_id_mixin = require '../../lib/file_id_mixin'
FileView = require '../file/FileView'

module.exports = React.createClass
	mixins: [file_details_loader, file_id_mixin]

	render: ->
		if not @detailsLoaded()
			return <FileView {...@props}/>

		<div className="main-image-container">
			<AppearanceOverlayManager
				src={@props.file_summary.image_url.val()}
				appearances={@getDetails()?.appearances}
			/>
		</div>
