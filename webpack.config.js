var path = require('path');
var webpack = require('webpack');
const fs  = require('fs');
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const lessToJs = require('less-vars-to-js');
module.exports = {
 entry: './client/index.js',
 output: {
  path: path.join(__dirname, 'client'),
  filename: 'bundle.js'
 },
// plugins: [new BundleAnalyzerPlugin()],
  plugins: [
  new UglifyJSPlugin()
],
 module: {
  loaders: [{
   test: /.jsx?$/,
   loader: 'babel-loader',
   exclude: /node_modules/,

   query: {
    presets: ["es2015", "react", "stage-0"]
   }
  },
   {
    test: /.js?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
     presets: ["es2015", "react", "stage-0"]
    }
  },
  {
   test: /\.css$/,
   loader: "style-loader!css-loader",
    exclude: /node_modules/

  },

  {
    test: /\.less$/,
    use: [
      {loader: "style-loader"},
      {loader: "css-loader"},
      {loader: "less-loader",
      options: {
        javascriptEnabled: true
      }}


],



 }]}}
