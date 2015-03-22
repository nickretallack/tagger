AutocompleteTagger = require './AutocompleteTagger'

module.exports = React.createClass
	render: ->
		<div>
			<label>Recurring character or object?</label>
			<p>(TODO)</p>

			<label>Edit this appearance</label>
			<AutocompleteTagger
				tags={[]}
				possible_tags={TAG_NAMES}
			/>
		</div>