to_selectize_options = (items) ->
	for item in items
		text: item
		value: item

$ ->
	tag_options = to_selectize_options TAG_NAMES
	$('.tag-field').selectize
		delimiter: ','
		persist: false
		create: (input) ->
			value: input
			text: input
		options: tag_options

	character_options = to_selectize_options CHARACTER_NAMES
	$('.character-field').selectize
		delimiter: ','
		persist: false
		create: (input) ->
			value: input
			text: input
		options: character_options

	combo_options = tag_options.concat(character_options)
	$('.tag-character-field').selectize
		delimiter: ','
		persist: false
		create: (input) ->
			value: input
			text: input
		options: combo_options
