CortexTagger = require './tag_input/CortexTagger'

module.exports = React.createClass
	render: ->
		<div>
			<div className="form-group">
				<label>Scene Tags</label>
				<CortexTagger
					ref="tags"
					tags={@props.file.tags}
					possible_tags={TAG_NAMES}
				/>
			</div>

			<div className="form-group">
				<label>Artist</label>
				<CortexTagger
					ref="artists"
					tags={@props.file.roles.artist}
					possible_tags={THING_NAMES}
				/>
			</div>

			<div className="form-group">
				<label>Recipients</label>
				<CortexTagger
					ref="recipients"
					tags={@props.file.roles.recipient}
					possible_tags={THING_NAMES}
				/>
			</div>
		</div>