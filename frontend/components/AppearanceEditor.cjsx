Tagger = require './AutocompleteTagger'

module.exports = React.createClass
	removeAppearance: ->
		@props.removeAppearance @props.id

	selectThing: (name) ->
		@props.thing_name.set name
		if not @props.cortex.thing_tags.hasKey name
			$.get "/api/thing/#{name}/tag", (response) =>
				@props.cortex.thing_tags.add name, response.items

	thingTags: ->
		collection = @props.cortex.thing_tags
		key = @props.thing_name.val()
		if collection.hasKey key
			collection[key].val()
		else
			[]

	mixedTags: ->
		_.difference(_.union(@thingTags(), @props.tags.getValue()), @props.negative_tags.getValue())

	thingNameTags: ->
		name = @props.thing_name.getValue()
		if name
			[name]
		else
			[]

	addTag: (name) ->
		index = @props.negative_tags.findIndex (item) -> item is name

		# remove negative tag
		if index isnt -1
			@props.tags.removeAt index

		# create positive tag
		else if name not in @thingTags()
			@props.tags.push name


	removeTag: (name) ->
		index = @props.tags.findIndex (item) -> item is name

		# remove positive tag
		if index isnt -1
			@props.tags.removeAt index

		# create negative tag
		else if name in @thingTags()
			@props.negative_tags.push name

	render: ->
	
		<div>
			<h3>Tag This Appearance</h3>
			<div className="form-group">
				<label>Recurring character or object?</label>
				<Tagger
					tags={@thingNameTags()}
					possible_tags={THING_NAMES}
					onTagAdd={@selectThing}
					onTagRemove={@}
				/>
			</div>

			<div className="form-group">
				<label>Edit this appearance</label>
				<Tagger
					tags={@mixedTags()}
					possible_tags={TAG_NAMES}
					onTagAdd={@addTag}
					onTagRemove={@removeTag}
				/>
				<p className="help-block">Does this thing appear differently in this picture from how it usually does?  Edit the tags for this particular appearance here.</p>
			</div>

			<button className="btn btn-danger" onClick={@removeAppearance}>Remove Appearance</button>
		</div>
