{Link, State, Navigation} = ReactRouter
AppearanceEditor = require './AppearanceEditor'
FileDetailEditor = require './FileDetailEditor'
module.exports = React.createClass
	mixins: [State, Navigation]
	currentAppearance: ->
		result = @props.cortex.appearances[@getParams().appearance_id]

	render: ->
		current_appearance = @currentAppearance()
		if current_appearance
			<div>
				<Link to="file details">Back</Link>
				<AppearanceEditor {...current_appearance} cortex={@props.cortex}/>
			</div>
		else
			<FileDetailEditor/>