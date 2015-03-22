Tagger = require './AutocompleteTagger'

module.exports = React.createClass
	removeAppearance: ->
		@props.removeAppearance @props.id

	render: ->
	
		<div>
			<h3>Tag This Appearance</h3>
			<div className="form-group">
				<label>Recurring character or object?</label>
				<Tagger
					tags={@props.tags}
					possible_tags={THING_NAMES}
				/>
			</div>

			<div className="form-group">
				<label>Edit this appearance</label>
				<Tagger
					tags={@props.tags}
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
