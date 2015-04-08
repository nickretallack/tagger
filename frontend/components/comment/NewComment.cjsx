module.exports = React.createClass
	contextTypes:
		router: React.PropTypes.func.isRequired	

	getInitialState: ->
		saving: false
		error: null

	onPost: ->
		file_id = @context.router.getCurrentParams().file_id
		input = @refs.text.getDOMNode()
		text = input.value
		@setState
			saving: true
		$.ajax
			type: 'post'
			url:"/api/file/#{file_id}/comments"
			data:
				text: text

			success: (response) =>
				input.value = ''
				@setState
					saving: false

				@props.comments.set response.items
			error: (error) =>
				@setState
					saving: false
					error: "failed to comment"

	render: ->
		<div>
			<div className="media">
				<div className="media-left">
					<a>
						<img className="media-object user-icon" src="/static/images/anonymous-icon.png"/>
					</a>
				</div>
				<div className="media-body">
					<a className="media-heading">Anonymous</a>
					<textarea className="form-control" ref="text"></textarea>
					<button className="btn btn-primary"
					onClick={@onPost} disabled={@state.saving}
					style={{marginTop: 10}}>Post Comment</button>
					{@state.error}
				</div>
			</div>
		</div>