'use strict'
Input = React.createClass
	render: ->
		ns = @props.ns
		inputClass = ns + 'tagsinput-input ' + (if @props.invalid then ns + 'tagsinput-invalid' else '')
		<input {...@props} type="text" className={inputClass} placeholder={@props.placeholder}/>

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
#			tags: []
			tag: ''
			invalid: false
		}
#	componentWillMount: ->
#		@setState tags: @props.tags.slice(0)
#		return
	getTags: ->
		@props.tags
	addTag: (tag, cb) ->
		before = @props.onBeforeTagAdd(tag)
		valid = ! !before and @props.validate(tag)
		tag = if typeof before == 'string' then before else tag
		if @props.tags.indexOf(tag) != -1 or !valid
			return @setState(invalid: true)
		@setState {
#			tags: @props.tags.concat([ tag ])
			tag: ''
			invalid: false
		}, ->
			@props.onTagAdd tag
			#@props.onChange @state.tags
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
			@props.onChange @state.tags
			return
		return
	onKeyDown: (e) ->
		add = @props.addKeys.indexOf(e.keyCode) != -1
		remove = @props.removeKeys.indexOf(e.keyCode) != -1
		if add
			e.preventDefault()
			@addTag @state.tag.trim()
		if remove and @state.tags.length > 0 and @state.tag == ''
			@removeTag @state.tags[@state.tags.length - 1]
		return
	onChange: (e) ->
		@props.onChangeInput e.target.value
		@setState
			tag: e.target.value
			invalid: false
		return
	onBlur: (e) ->
		_this = this
		if !@props.addOnBlur
			@props.onBlur @state.tags
			return
		if @state.tag != '' and !@state.invalid
			return @addTag(@state.tag.trim(), ->
				_this.props.onBlur _this.state.tags
				return
			)
		_this.props.onBlur _this.state.tags
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
