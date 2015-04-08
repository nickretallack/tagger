todo = React.createClass
	render: ->
		<div>todo</div>

if ENTRY_POINT? and ENTRY_POINT is 'tag-file'
	cortex = new Cortex
		# caches
		thing_tags: {}
		server_file_details: {}
		file_comments: {}

		# current state
		file_details: {}
		search_results: SEARCH_RESULTS

	{Route, DefaultRoute} = ReactRouter
	routes = [
		<DefaultRoute name="file list" handler={require './components/routing/file/list'}/>
		<Route name="file show" path='file/:file_id' handler={require './components/routing/file/show'}>
			<DefaultRoute name="file overview" handler={require './components/file/FileView'}/>
			<Route name="file appearances" path='appearances' handler={require './components/appearance/AppearanceBase'}>
				<DefaultRoute name="file appearance overview" handler={require './components/appearance/AppearanceList'}/>
				<Route name="file appearance" path=':appearance_id' handler={require './components/appearance/AppearanceEdit'}/>
			</Route>
			<Route name="file classic" path='classic' handler={require './components/routing/file/classic'}/>
			<Route name="file comments" path='comments' handler={require './components/routing/file/comments'}/>
			<Route name="file details" path='details' handler={require './components/routing/file/details'}/>
			<Route name="file tags" path='tags' handler={require './components/file/FileView'}/>
		</Route>
	]

	container = document.getElementById("react-image-tagger")
	current_component = null
	ReactRouter.run routes, (Handler) ->
		element = <Handler cortex={cortex}/>

		current_component = React.render element, container

	cortex.on "update", (data) ->
		current_component.setProps
			cortex:data

