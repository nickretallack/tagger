{to_selectize_options} = require '../../lib/selectize'

module.exports = React.createClass
	propTypes:
		tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired

	componentDidMount: ->
		console.log @props.tags
		tag_options = to_selectize_options TAG_NAMES
		$(@refs.field.getDOMNode()).selectize
			delimiter: ','
			persist: false
			create: (input) ->
				value: input
				text: input
			options: tag_options
			items: @props.tags

	render: ->
		<div>
			<select ref="field" multiple></select>
		</div>