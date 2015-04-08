CortexTagger = require './tag_input/CortexTagger'
file_details_loader = require '../lib/file_details_loader'

module.exports = React.createClass
	mixins: [file_details_loader]

	render: ->
		if not @detailsLoaded()
			return <div>Loading...</div>

		<div>
			<div className="form-group">
				<label>Scene Tags</label>
				<CortexTagger
					ref="tags"
					tags={@getDetails().tags}
					possible_tags={TAG_NAMES}
				/>
				<p className="help-block">What is happening in this picture?</p>
			</div>

			<div className="form-group">
				<label>Artists</label>
				<CortexTagger
					ref="artists"
					tags={@getDetails().roles.artist}
					possible_tags={THING_NAMES}
				/>
				<p className="help-block">Who made this?</p>
			</div>

			<div className="form-group">
				<label>Recipients</label>
				<CortexTagger
					ref="recipients"
					tags={@getDetails().roles.recipient}
					possible_tags={THING_NAMES}
				/>
				<p className="help-block">Who was this made for?</p>
			</div>
			<button className="btn btn-primary" onClick={@saveDetails}>Save</button>
		</div>