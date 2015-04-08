FileDetailEditor = require '../../FileDetailEditor'
module.exports = React.createClass
	render: ->
		src = @props.file_summary.image_url.val()
		image = <img className="main-image" src={src}/>

		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2 sidebar">
				<FileDetailEditor cortex={@props.cortex}/>
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				{image}
			</div>
		</div>

