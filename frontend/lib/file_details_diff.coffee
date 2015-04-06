tag_diff = (new_tags, old_tags) ->
	add: _.difference(new_tags, old_tags)
	remove: _.difference(old_tags, new_tags)

module.exports = (details, server_state) ->
	new_appearances = []
	updated_appearances = {}
	details.appearances.forEach (key, appearance) ->
		appearance = appearance.val()
		if key[0...4] is 'new-'
			new_appearances.push appearance
		else
			old_appearance = server_state.appearances[key]
			if _.isEqual(old_appearance, appearance)
				return

			delta = {}

			if not _.isEqual(appearance.dimensions, old_appearance.dimensions)
				delta.dimensions = appearance.dimensions					

			new_thing_name = appearance.thing_name
			if new_thing_name != old_appearance.thing_name
				delta.new_thing_name = new_thing_name

			delta.tags = tag_diff(appearance.tags, old_appearance.tags)
			delta.negative_tags = tag_diff(appearance.negative_tags, old_appearance.negative_tags)
			updated_appearances[key] = delta

	removed_appearances = _.difference(_.keys(server_state.appearances), details.appearances.keys())

	role_diffs = {}
	for role in ['artist','recipient']
		role_diffs[role] = tag_diff(details.roles[role].val(), server_state.roles[role])

	message =
		appearances:
			create: new_appearances
			delete: removed_appearances
			update: updated_appearances
		roles: role_diffs
		tags: tag_diff(details.tags.val(), server_state.tags)

	message