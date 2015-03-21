$('.tag-field').selectize
	delimiter: ','
	persist: false
	create: (input) ->
		value: input
		text: input
