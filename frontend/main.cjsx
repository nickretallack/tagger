#window.TagDelta = require './components/TagDelta'
window.TaggingActivityWrapper = require './components/TaggingActivityWrapper'
#window.Test = require './components/Test'
#window.AutoCompleteTagger = require './components/AutoCompleteTagger'
#AppearanceEditor = require './components/AppearanceEditor'



if ENTRY_POINT? and ENTRY_POINT is 'tag-file'
	cortex = new Cortex
		file_editor:
			appearances: {}
		thing_tags: {}

	{Route, DefaultRoute} = ReactRouter
	routes = (
		<Route handler={TaggingActivityWrapper}>
			{TaggingActivityWrapper.routes}
		</Route>
	)

	container = document.getElementById("react-image-tagger")
	current_component = null
	ReactRouter.run routes, (Handler) ->
		element = <Handler
			image_url={IMAGE_URL}
			sync_url={SYNC_URL}
			cortex={cortex}
			/>

		current_component = React.render element, container

	cortex.on "update", (data) ->
		current_component.setProps
			cortex:data

