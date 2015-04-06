FileDetailEditor = require '../../FileDetailEditor'
module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired
	render: ->
		src = @props.file_summary.image_url.val()
		image = <img className="main-image" src={src}/>

		details = if @props.file_details
			<FileDetailEditor file_details={@props.file_details}/>
		else
			<div>Loading...</div>

		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2 sidebar">
				{details}
				{@props.save_button}
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				{image}
			</div>
		</div>

