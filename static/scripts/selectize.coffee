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
