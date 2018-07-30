const path = require('path');
const htmlwebpackplugin = require("html-webpack-plugin");
const cleanwebpackplugin = require('clean-webpack-plugin');
const optimizeCss =require('optimize-css-assets-webpack-plugin');
const extractTextPlugin=require('extract-text-webpack-plugin');
const uglifyjs=require('uglifyjs-webpack-plugin');

const webpack = require("webpack");
module.exports={
	entry:{
		index:path.join(__dirname,'./index.js'),
		babelPlolyfill:'babel-polyfill'
	},
	output:{
		path:path.join(__dirname,'./dist'),
		filename:'js/[name].js',
        chunkFilename:'js/[name][hash].js',
        publicPath:'/'
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
                
                // use:extractTextPlugin.extract({
                //     fallback:'style-loader',
                //     use:['css-loader','less-loader','postcss-loader']
                //   })
			}
			,
			{
                test:/\.less$/,
				use:['style-loader','css-loader?modules','less-loader?modules','postcss-loader']
                
                // use:extractTextPlugin.extract({
                //     fallback:'style-loader',
                //     use:['style-loader','css-loader?modules','less-loader?modules','postcss-loader']
                //   })
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
        new extractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
       }),
		//  new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
         new cleanwebpackplugin('./dist/*'),
        //  new optimizeCss(),
         new uglifyjs(),
	],
    devtool:'cheap-module-source-map',
}
