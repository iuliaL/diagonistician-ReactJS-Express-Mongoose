var path    = require('path');

module.exports = {
	watch: true,
	colors: true,
	progress: true,
	entry: "./client/src/js/app.js",
	output : {
		path: path.join(__dirname,'/client/dist/build/'), // absolute path
		publicPath:	'/build/', // Relative to server root, in my case client/dist, that's the content base
		filename: "bundle.js"
	},
	module: {
		loaders : [
			{
				test: /\.js$/,
				include: /client/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname,"client/dist"), // serve front-end from localhost:3001/client/dist
		inline: true,
		port: 3001,
		hot: true
	}
};