module.exports = (object, key, value) ->
	if object.hasKey key
		object[key].set value
	else
		object.add key, value