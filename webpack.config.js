const path    = require('path');

const config = {
	watch: true,
	colors: true,
	progress: true,
	entry: "./client/src/js/index.js",
	output : {
		path: path.join(__dirname,'/client/dist/build/'), // absolute path
		publicPath:	'/build/', // Relative to server root, in my case client/dist, that's the content base where my index.html and all assets live
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
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname,"client/dist"), // serve front-end from localhost:3001/client/dist
	}
};

module.exports = config;