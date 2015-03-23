AppearanceOverlayManager = require './AppearanceOverlayManager'
FileTagDetails = require './FileTagDetails'
{RouteHandler, Navigation} = ReactRouter

module.exports = React.createClass
	mixins: [Navigation]
	render: ->
		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2">
				<RouteHandler
				cortex={@props.cortex}
				key={@context.router.getCurrentParams().appearance_id}
				removeAppearance={@removeAppearance}
				/>
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				<AppearanceOverlayManager
				src={IMAGE_URL}
				createAppearance={@createAppearance}
				appearances={@props.cortex.appearances}
				/>
			</div>
		</div>

