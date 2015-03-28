#window.TagDelta = require './components/TagDelta'
#window.TaggingActivityWrapper = require './components/TaggingActivityWrapper'
#window.Test = require './components/Test'
#window.AutoCompleteTagger = require './components/AutoCompleteTagger'
#AppearanceEditor = require './components/AppearanceEditor'


if ENTRY_POINT? and ENTRY_POINT is 'tag-file'
	cortex = new Cortex
		thing_tags: {}
		file_details: {}
		search_results: SEARCH_RESULTS

	{Route, DefaultRoute} = ReactRouter
	routes = [
		<DefaultRoute name="file list" handler={require './components/routing/list'}/>
		<Route name="file show" path='file/:file_id' handler={require './components/routing/show'}/>
	]

	container = document.getElementById("react-image-tagger")
	current_component = null
	ReactRouter.run routes, (Handler) ->
		element = <Handler cortex={cortex}/>

		current_component = React.render element, container

	cortex.on "update", (data) ->
		current_component.setProps
			cortex:data

