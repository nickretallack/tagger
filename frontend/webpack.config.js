module.exports = {
	entry: "./main.cjsx",
	output: {
		path: __dirname + "/../static/",
		filename: "bundle.js",
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: "style!css"},
			{test: /\.coffee$/, loader: "coffee"},
			{test: /\.jsx$/, loaders: ['jsx']},
			{test: /\.cjsx$/, loaders: ['coffee', 'cjsx']},
		]
	},
	resolveLoader: {
		modulesDirectories: ['node_modules']
	},
	resolve: {
		extensions: ['', '.js', '.cjsx', '.coffee']
	}
};