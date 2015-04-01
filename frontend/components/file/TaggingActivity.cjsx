AppearanceOverlayManager = require './appearance/AppearanceOverlayManager'
{RouteHandler} = ReactRouter

module.exports = React.createClass
	displayName: 'TaggingActivity'

	render: ->
		sidebar = if @props.file_details.val()
			<div>
				<h3>File Details</h3>
				<div className="form-group">
				<button disabled={@state.saving} onClick={@save} className="btn btn-primary" style={{marginBottom:15}}>Save All Changes and Reload</button>
				{error}
				</div>
				<RouteHandler
				cortex={@props.cortex}
				file={@props.file}
				appearances={@props.file_details.appearances}
				key={@context.router.getCurrentParams().appearance_id}
				/>
			</div>
		else
			<div>Loading...</div>

		error = if @state.error
			<div>Failed to save.  Try again?</div>

		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2">
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				<AppearanceOverlayManager
					src={@props.file_summary.image_url.val()}
					appearances={@props.file_details.appearances}
				/>
			</div>
		</div>

