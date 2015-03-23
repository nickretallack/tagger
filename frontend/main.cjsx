#window.TagDelta = require './components/TagDelta'
window.TaggingActivity = require './components/TaggingActivity'
#window.Test = require './components/Test'
#window.AutoCompleteTagger = require './components/AutoCompleteTagger'

if ENTRY_POINT? and ENTRY_POINT is 'tag-file'
	cortex = new Cortex
		appearances: {}
		selected_appearance: null

	element = <TaggingActivity
		image_url={IMAGE_URL}
		cortex={cortex}
		/>

	component = React.render element, document.getElementById("react-image-tagger")

	cortex.on "update", (data) ->
		component.setProps
			cortex:data
