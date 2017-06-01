const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/public/vue/dist/',
        filename: '[name].build.js',
        path: path.join(__dirname, './dist')
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress:{
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        })
    ]
});