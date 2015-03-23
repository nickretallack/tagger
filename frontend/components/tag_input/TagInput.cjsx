'use strict'
Input = React.createClass
	render: ->
		ns = @props.ns
		inputClass = ns + 'tagsinput-input ' + (if @props.invalid then ns + 'tagsinput-invalid' else '')
		<input ref="input" {...@props} type="text" className={inputClass} placeholder={@props.placeholder}/>

Tag = React.createClass
	render: ->
		React.createElement 'span', { className: @props.ns + 'tagsinput-tag' }, @props.tag + ' ', React.createElement('a',
			onClick: @props.remove
			className: @props.ns + 'tagsinput-remove')

module.exports = React.createClass
	getDefaultProps: ->
		{
			tags: []
			placeholder: 'Add a tag'
			validate: (tag) ->
				tag != ''
			addKeys: [
				13
				9
			]
			removeKeys: [ 8 ]
			onBeforeTagAdd: ->
				true
			onBeforeTagRemove: ->
				true
			onTagAdd: ->
			onTagRemove: ->
			onChange: ->
			onChangeInput: ->
			onBlur: ->
			classNamespace: 'react'
			addOnBlur: true
		}
	getInitialState: ->
		{
			tag: ''
			invalid: false
		}
	clearInput: ->
		@setState tag: ''

	getTags: ->
		@props.tags
	addTag: (tag, cb) ->
		before = @props.onBeforeTagAdd(tag)
		valid = ! !before and @props.validate(tag)
		tag = if typeof before == 'string' then before else tag
		if @props.tags.indexOf(tag) != -1 or !valid
			return @setState(invalid: true)
		@setState {
			tag: ''
			invalid: false
		}, ->
			@props.onTagAdd tag
			@inputFocus()
			if cb
				return cb()
			return
		return
	removeTag: (tag) ->
		valid = @props.onBeforeTagRemove(tag)
		if !valid
			return
		tags = @props.tags.slice(0)
		i = tags.indexOf(tag)
		tags.splice i, 1
		@setState {
			tags: tags
			invalid: false
		}, ->
			@props.onTagRemove tag
			return
		return
	onKeyDown: (e) ->
		add = @props.addKeys.indexOf(e.keyCode) != -1
		remove = @props.removeKeys.indexOf(e.keyCode) != -1
		if add
			e.preventDefault()
			@addTag @state.tag.trim()
		if remove and @props.tags.length > 0 and @state.tag == ''
			@removeTag @props.tags[@props.tags.length - 1]
		return
	onChange: (e) ->
		@props.onChangeInput e.target.value
		@setState
			tag: e.target.value
			invalid: false
		return
	onBlur: (e) ->
		if !@props.addOnBlur
			@props.onBlur @props.tags
			return
		if @state.tag != '' and !@state.invalid
			return @addTag(@state.tag.trim(), =>
				@props.onBlur @props.tags
				return
			)
		@props.onBlur @props.tags
		return
	inputFocus: ->
		@refs.input.getDOMNode().focus()
		return
	render: ->
		ns = if @props.classNamespace == '' then '' else @props.classNamespace + '-'
		tagNodes = @props.tags.map(((tag, i) ->
			React.createElement Tag,
				key: i
				ns: ns
				tag: tag
				remove: @removeTag.bind(null, tag)
		).bind(this))

		<div className={"#{ns}tagsinput"}>
			{tagNodes}
			<Input
			ref="input"
			ns={ns}
			placeholder={@props.placeholder}
			value={@state.tag}
			invalid={@state.invalid}
			onKeyDown={@onKeyDown}
			onChange={@onChange}
			onBlur={@onBlur}
			/>
		</div>
