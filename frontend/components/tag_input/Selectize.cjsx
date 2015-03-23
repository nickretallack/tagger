{to_selectize_options} = require '../../lib/selectize'

module.exports = React.createClass
	propTypes:
		tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired

	componentDidMount: ->
		tag_options = to_selectize_options TAG_NAMES
		$(@refs.field).selectize
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


module.exports = React.createClass
	componentDidMount: ->



	render: ->
		<div ref="field"></div>

$ ->
	tag_options = to_selectize_options TAG_NAMES
	$('.tag-field').selectize
		delimiter: ','
		persist: false
		create: (input) ->
			value: input
			text: input
		options: tag_options

	thing_options = to_selectize_options THING_NAMES
	$('.thing-field').selectize
		delimiter: ','
		persist: false
		create: (input) ->
			value: input
			text: input
		options: thing_options

	combo_options = tag_options.concat(thing_options)
	$('.tag-thing-field').selectize
		delimiter: ','
		persist: false
		create: (input) ->
			value: input
			text: input
		options: combo_options
