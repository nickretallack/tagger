module.exports = React.createClass
	render: ->
		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2 sidebar">
				{@props.sidebar}
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				{@props.main}
			</div>
		</div>
