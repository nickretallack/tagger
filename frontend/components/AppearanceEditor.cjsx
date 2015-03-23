Tagger = require './AutocompleteTagger'

module.exports = React.createClass
	getInitialState: ->
		thing_tags: []

	removeAppearance: ->
		@props.removeAppearance @props.id

	selectThing: (name) ->
		$.get "/api/thing/#{name}/tag", (response) =>
			@setState thing_tags: response.items
		@props.thing_name.set name

	mixedTags: ->
		_.difference(_.union(@state.thing_tags, @props.tags.getValue()), @props.negative_tags.getValue())

	thingNameTags: ->
		name = @props.thing_name.getValue()
		if name
			[name]
		else
			[]

	addTag: (name) ->
		index = @props.negative_tags.findIndex()

		# remove negative tag
		if index isnt -1
			@props.tags.removeAt index

		# create positive tag
		else if name not in @state.thing_tags
			@props.tags.push name


	removeTag: (name) ->
		index = @props.tags.findIndex()

		# remove positive tag
		if index isnt -1
			@props.tags.removeAt index

		# create negative tag
		else if name in @state.thing_tags
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

			<p>
			debug:
			{@props.id}
			{@props.tags}
			</p>

			<button className="btn btn-danger" onClick={@removeAppearance}>Remove Appearance</button>
		</div>
