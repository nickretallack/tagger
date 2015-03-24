Tagger = require '../tag_input/Tagger'

module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired

	removeAppearance: ->
		@props.appearance.remove()
		@context.router.transitionTo 'file details'

	fetchThingTags: (name) ->
		if not @props.cortex.thing_tags.hasKey name
			$.ajax
				type: 'get'
				url: "/api/thing/#{name}/tag"
				success: (response) =>
					console.log 'loaded'
					@props.cortex.thing_tags.add name, response.items
				error: =>
					@props.cortex.thing_tags.add name, null


	selectThing: (name) ->
		@props.thing_name.set name
		@fetchThingTags name

	componentDidMount: ->
		name = @props.thing_name.val()
		@fetchThingTags name

	thingTagsLoading: ->
		try
			@thingTags()
			false
		catch
			true

	unSelectThing: ->
		@props.thing_name.set null
		@props.negative_tags.set []

	thingTags: ->
		key = @props.thing_name.val()
		if not key
			return []

		collection = @props.cortex.thing_tags
		if not collection.hasKey(key)
			throw 'loading'

		return collection[key].val()

	mixedTags: ->
		_.difference(_.union(@thingTags(), @props.tags.getValue()), @props.negative_tags.getValue())

	thingNameTags: ->
		name = @props.thing_name.getValue()
		if name
			[name]
		else
			[]

	addTag: (name) ->
		index = @props.negative_tags.findIndex (item) -> item.val() is name

		# remove negative tag
		if index isnt -1
			@props.tags.removeAt index

		# create positive tag
		else if name not in @thingTags()
			@props.tags.push name


	removeTag: (name) ->
		index = @props.tags.findIndex (item) -> item.val() is name

		# remove positive tag
		if index isnt -1
			@props.tags.removeAt index

		# create negative tag
		else if name in @thingTags()
			@props.negative_tags.push name

	render: ->
		tagger = unless @thingTagsLoading()
			<Tagger
			ref="tags"
			tags={@mixedTags()}
			possible_tags={TAG_NAMES}
			onTagAdd={@addTag}
			onTagRemove={@removeTag}
			/>
		else
			<div>Loading...</div>
	
		<div>
			<h3>Tag This Appearance</h3>
			<div className="form-group">
				<label>Recurring character or object?</label>
				<Tagger
					ref="thing"
					tags={@thingNameTags()}
					possible_tags={THING_NAMES}
					onTagAdd={@selectThing}
					onTagRemove={@unSelectThing}
				/>
			</div>

			<div className="form-group">
				<label>Edit this appearance</label>
				{tagger}
				<p className="help-block">Does this thing appear differently in this picture from how it usually does?  Edit the tags for this particular appearance here.</p>
			</div>

			<button className="btn btn-danger" onClick={@removeAppearance}>Remove Appearance</button>
		</div>
