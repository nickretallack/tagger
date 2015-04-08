{Link} = ReactRouter
AppearanceEditor = require './AppearanceEditor'
AppearanceOverlayManager = require './AppearanceOverlayManager'
file_details_loader = require '../../lib/file_details_loader'
file_id_mixin = require '../../lib/file_id_mixin'
FileView = require '../file/FileView'

module.exports = React.createClass
	mixins: [file_details_loader, file_id_mixin]

	currentAppearance: ->
		result = @getDetails()?.appearances[@context.router.getCurrentParams().appearance_id]

	render: ->
		if not @detailsLoaded()
			return <FileView {...@props}/>

		current_appearance = @currentAppearance()
		src = @props.file_summary.image_url.val()

		image = if @detailsLoaded()
			<AppearanceOverlayManager
				src={src}
				appearances={@getDetails()?.appearances}
			/>
		else
			<div className="main-image-container">
				<img className="main-image" src={src}/>
			</div>

		if current_appearance
			<div className="row">
				<div className="col-sm-4 col-md-3 col-lg-2 sidebar">
					<AppearanceEditor {...current_appearance}  appearance={current_appearance} cortex={@props.cortex} save={@saveDetails} ref="editor"/>
				</div>

				<div className="col-sm-8 col-md-9 col-lg-10">
					{image}
				</div>
			</div>
		else
			image

