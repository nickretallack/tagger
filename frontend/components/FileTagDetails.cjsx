AutocompleteTagger = require './AutocompleteTagger'
AppearanceEditor = require './AppearanceEditor'

module.exports = React.createClass
	render: ->
		main_content = if @props.selected_appearance
			<div>
				<p><a onClick={@props.unSelectAppearance}>
					Back
				</a></p>
				<AppearanceEditor {...@props.selected_appearance}/>
			</div>
		else
			<div>...</div>


		<div>
			{main_content}
		</div>