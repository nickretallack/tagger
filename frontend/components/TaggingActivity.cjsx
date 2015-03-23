AppearanceOverlayManager = require './appearance/AppearanceOverlayManager'
{RouteHandler, Route, DefaultRoute} = ReactRouter

module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired

	statics:
		routes: [
			<DefaultRoute name="file details" handler={require './FileDetailEditor'}/>
			<Route name="appearance" path="appearance/:appearance_id" handler={require './appearance/AppearanceEditorWrapper'}/>
		]


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

