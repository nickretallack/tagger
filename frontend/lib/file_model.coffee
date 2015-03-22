module.exports =
	listeners: []


	listen: (callback) ->
		@listeners.push callback

	broadcast: ->
		for callback in listeners
			callback

	state = null

	load_data: (url) ->
		request = $.ajax
			type: 'get'
			url: url

		request.then (response) =>
