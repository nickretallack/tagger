CortexTagger = require './tag_input/CortexTagger'

module.exports = React.createClass
	render: ->
		<div>
			<div className="form-group">
				<label>Scene Tags</label>
				<CortexTagger
					ref="tags"
					tags={@props.file_details.tags}
					possible_tags={TAG_NAMES}
				/>
				<p className="help-block">What is happening in this picture?</p>
			</div>

			<div className="form-group">
				<label>Artists</label>
				<CortexTagger
					ref="artists"
					tags={@props.file_details.roles.artist}
					possible_tags={THING_NAMES}
				/>
				<p className="help-block">Who made this?</p>
			</div>

			<div className="form-group">
				<label>Recipients</label>
				<CortexTagger
					ref="recipients"
					tags={@props.file_details.roles.recipient}
					possible_tags={THING_NAMES}
				/>
				<p className="help-block">Who was this made for?</p>
			</div>
		</div>