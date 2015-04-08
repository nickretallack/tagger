FileDetailEditor = require '../../FileDetailEditor'
SidebarLayout = require '../../SidebarLayout'
module.exports = React.createClass
	render: ->
		src = @props.file_summary.image_url.val()
		image = <img className="main-image" src={src}/>

		sidebar = <FileDetailEditor cortex={@props.cortex}/>
		<SidebarLayout sidebar={sidebar} main={image}/>
