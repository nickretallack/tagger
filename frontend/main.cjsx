#window.TagDelta = require './components/TagDelta'
window.TaggingActivity = require './components/TaggingActivity'
#window.Test = require './components/Test'
#window.AutoCompleteTagger = require './components/AutoCompleteTagger'
#AppearanceEditor = require './components/AppearanceEditor'

if ENTRY_POINT? and ENTRY_POINT is 'tag-file'
	cortex = new Cortex
		appearances: {}
		selected_appearance: null
		thing_tags: {}

	{Route, DefaultRoute} = ReactRouter
	routes = (
		<Route handler={TaggingActivity}>
			<DefaultRoute name="file details" handler={require './components/FileDetailEditor'}/>
			<Route name="appearance" path="appearance/:appearance_id" handler={require './components/appearance/AppearanceEditorWrapper'}/>
		</Route>
	)

	container = document.getElementById("react-image-tagger")
	current_component = null
	ReactRouter.run routes, (Handler) ->
		element = <Handler
			image_url={IMAGE_URL}
			cortex={cortex}
			/>

		current_component = React.render element, container

	cortex.on "update", (data) ->
		current_component.setProps
			cortex:data

