{Link} = ReactRouter
AppearanceEditor = require './AppearanceEditor'
FileDetailEditor = require '../FileDetailEditor'
module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired

	currentAppearance: ->
		result = @props.cortex.appearances[@context.router.getCurrentParams().appearance_id]

	render: ->
		current_appearance = @currentAppearance()
		if current_appearance
			<div>
				<Link to="file details">Back</Link>
				<AppearanceEditor {...current_appearance} cortex={@props.cortex} ref="editor"/>
			</div>
		else
			<FileDetailEditor/>