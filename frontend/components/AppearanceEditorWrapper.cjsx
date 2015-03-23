{State, Navigation} = ReactRouter
AppearanceEditor = require './AppearanceEditor'
module.exports = React.createClass
	mixins: [State, Navigation]
	currentAppearance: ->
		result = @props.cortex.appearances[@getParams().appearance_id]

	render: ->
		current_appearance = @currentAppearance()
		if current_appearance
			<AppearanceEditor {...current_appearance} cortex={@props.cortex}/>
		else
			<div>oops</div>