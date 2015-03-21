to_selectize_options = (items) ->
	for item in items
		text: item
		value: item


$('.tag-field').selectize
	delimiter: ','
	persist: false
	create: (input) ->
		value: input
		text: input
	options: to_selectize_options TAG_NAMES

$('.character-field').selectize
	delimiter: ','
	persist: false
	create: (input) ->
		value: input
		text: input
	options: to_selectize_options CHARACTER_NAMES