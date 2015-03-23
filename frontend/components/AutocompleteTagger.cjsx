ReactTagsInput = require './Tagger'

module.exports = React.createClass(
	displayName: 'AutoCompleteTagger'
	propTypes:
		tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
		possible_tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
		allow_new_tags: React.PropTypes.bool.isRequired

	getDefaultProps: ->
		tags: []
		possible_tags: []
		allow_new_tags: true

	getInitialState: ->
		{ completions: [] }
	complete: (value) ->
		if value == ''
			return @setState(completions: [])
		@setState completions: @props.possible_tags.filter(((comp) ->
			comp.substr(0, value.length) == value and @refs.tags.getTags().indexOf(comp) == -1
		).bind(this))
		return
	beforeAdd: (tag) ->
		if @props.possible_tags.indexOf(tag) != -1
			return true
		if @state.completions.length == 1
			return @state.completions[0]
		@props.allow_new_tags
	add: (tag) ->
		@setState completions: []
		@props.onTagAdd? tag
		return
	render: ->
		completionNodes = @state.completions.map(((comp) ->
			add = ((e) ->
				@refs.tags.addTag comp
				return
			).bind(this)
			React.createElement 'span', {}, React.createElement('a', {
				className: ''
				onClick: add
			}, comp), ' '
		).bind(this))
		tagsInputProps = 
			ref: 'tags'
			tags: @props.tags
			onChangeInput: @complete
			onTagAdd: @add
			onTagRemove: @props.onTagRemove
			onBeforeTagAdd: @beforeAdd
			addOnBlur: false
			placeholder: ''
		React.createElement 'div', null, React.createElement(ReactTagsInput, tagsInputProps), React.createElement('div', { style: marginTop: '10px' }, completionNodes)
)
