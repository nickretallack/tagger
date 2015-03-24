{RouteHandler, Route, DefaultRoute} = ReactRouter
TaggingActivity = require './TaggingActivity'
module.exports = React.createClass
	statics:
		routes: [
			<DefaultRoute key="file details" name="file details" handler={require './FileDetailEditor'}/>
			<Route key="appearance" name="appearance" path="appearance/:appearance_id" handler={require './appearance/AppearanceEditorWrapper'}/>
		]
	render: ->
		<TaggingActivity {...@props} file={@props.cortex.file_editor} cortex={@props.cortex}/>

