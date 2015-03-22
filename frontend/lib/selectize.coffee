module.exports.to_selectize_options = (items) ->
	for item in items
		text: item
		value: item

