var path    = require('path');

module.exports = {
	watch: true,
	colors: true,
	progress: true,
	
	entry: "./client/js/app.js",
	output : {
		path: path.join(__dirname,'/client/build'),
		filename: "bundle.js"
		//publicPath: path.join(__dirname,'/client/build')
		
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
		contentBase: path.join(__dirname,"/client"), // serve front-end from localhost:3001/client/
		inline: true,
		port: 3001,
		hot: true
	}
};