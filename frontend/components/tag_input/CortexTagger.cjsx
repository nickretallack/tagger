Tagger = require './Tagger'

module.exports = React.createClass
	addTag: (name) ->
		item = @props.tags.find (item) -> item.val() is name
		if not item
			@props.tags.push name

	removeTag: (name) ->
		item = @props.tags.find (item) -> item.val() is name
		item.remove()

	render: ->
		<Tagger
			tags={@props.tags.val()}
			possible_tags={@props.possible_tags}
			onTagAdd={@addTag}
			onTagRemove={@removeTag}
		/>