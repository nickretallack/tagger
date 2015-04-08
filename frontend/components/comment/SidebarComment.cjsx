module.exports = React.createClass
	render: ->
		<div className="media">
			<div className="media-left">
				<a>
					<img className="media-object user-icon" src="/static/images/anonymous-icon.png"/>
				</a>
			</div>
			<div className="media-body">
				<a className="media-heading">Anonymous</a>: 
				{@props.text.val()}
			</div>
		</div>