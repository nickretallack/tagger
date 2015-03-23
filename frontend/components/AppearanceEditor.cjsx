Tagger = require './AutocompleteTagger'

module.exports = React.createClass
	getInitialState: ->
		thing_tags: []

	removeAppearance: ->
		@props.removeAppearance @props.id

	selectThing: (name) ->
		$.get "/api/thing/#{name}/tag", (response) =>
			@setState thing_tags: response.items
		@props.selectThing name

	mixedTags: ->
		_.union(@state.thing_tags, @props.tags)

	render: ->
	
		<div>
			<h3>Tag This Appearance</h3>
			<div className="form-group">
				<label>Recurring character or object?</label>
				<Tagger
					tags={@props.tags}
					possible_tags={THING_NAMES}
					onTagAdd={@selectThing}
				/>
			</div>

			<div className="form-group">
				<label>Edit this appearance</label>
				<Tagger
					tags={@mixedTags()}
					possible_tags={TAG_NAMES}
				/>
				<p class="help-block">Does this thing appear differently in this picture from how it usually does?  Edit the tags for this particular appearance here.</p>
			</div>

			<p>
			debug:
			{@props.id}
			{@props.tags}
			</p>

			<button className="btn btn-danger" onClick={@removeAppearance}>Remove Appearance</button>
		</div>
