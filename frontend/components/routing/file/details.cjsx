FileDetailEditor = require '../../FileDetailEditor'
module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired
	render: ->
		src = @props.file_summary.image_url.val()
		image = <img className="main-image" src={src}/>

		if @props.file_details
			<div className="row">
				<div className="col-sm-4 col-md-3 col-lg-2 sidebar">
					<FileDetailEditor file_details={@props.file_details}/>
				</div>

				<div className="col-sm-8 col-md-9 col-lg-10">
					{image}
				</div>
			</div>
		else
			image

