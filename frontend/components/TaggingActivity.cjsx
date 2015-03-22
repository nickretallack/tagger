ImageTagger = require './ImageTagger'

module.exports = React.createClass

	selectAppearance: (id) ->
		console.log id

	render: ->
		<div className="row">
			<div className="col-sm-4 col-md-3 col-lg-2">
				<h3>Sidebar</h3>
			</div>

			<div className="col-sm-8 col-md-9 col-lg-10">
				<ImageTagger src={IMAGE_URL} selectAppearance={@selectAppearance}/>
				<img src={IMAGE_URL} className="file view"/>
			</div>
		</div>
