const path = require('path');
const htmlwebpackplugin = require("html-webpack-plugin");
const cleanwebpackplugin = require('clean-webpack-plugin');
const webpack = require("webpack");
module.exports={
	entry:{
		index:path.join(__dirname,'./index.js'),
		babelPlolyfill:'babel-polyfill'
	},
	output:{
		path:path.join(__dirname,'./dist'),
		filename:'[name].js',
		chunkFilename:'[name][hash].js'
	},
	module:{
		rules:[
			{
				test:/\.jsx?$/,
				exclude:/node_modules/,
				use:['babel-loader?cacheDirectory=true'],
				// include:path.join(__dirname,'index.js')
			},
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			}
			,
			{
				test:/\.less$/,
				use:['style-loader','css-loader?modules','less-loader?modules','postcss-loader']
			},
			{
				test:/\.(png|jpe?g|gif|svg)(\?\S*)?$/,
				loader:'url-loader',
				options:{
				  limit:8192
				}
			  },
			  {
				test:/\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader:'file-loader',
			  }
		]
	},
	plugins:[
		new htmlwebpackplugin({
			filename:'index.html',
			template:path.join(__dirname,'./index.html'),
			inject:true
		}),
		//  new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
		 new cleanwebpackplugin('./dist/*')
	],
	devServer:{
		// contentBase:path.join(__dirname,'./dist'),
		host:'localhost',
		open:true,
		historyApiFallback: true,
		open:true,
        hot:true,
        inline:true,
        historyApiFallback: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        useLocalIp: true,

	},
	  devtool: 'inline-source-map',
}
