{Link} = ReactRouter
AppearanceEditor = require './AppearanceEditor'
AppearanceOverlayManager = require './AppearanceOverlayManager'
module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired

	currentAppearance: ->
		result = @props.file_details?.appearances[@context.router.getCurrentParams().appearance_id]

	render: ->
		current_appearance = @currentAppearance()
		src = @props.file_summary.image_url.val()

		image = if @props.file_details
			<AppearanceOverlayManager
				src={src}
				appearances={@props.file_details?.appearances}
			/>
		else
			<div className="main-image-container">
				<img className="main-image" src={src}/>
			</div>

		if current_appearance
			<div className="row">
				<div className="col-sm-4 col-md-3 col-lg-2 sidebar">
					<AppearanceEditor {...current_appearance}  appearance={current_appearance} cortex={@props.cortex} save={@props.save} ref="editor"/>
				</div>

				<div className="col-sm-8 col-md-9 col-lg-10">
					{image}
				</div>
			</div>
		else
			image

