const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{from: 'data', to: 'data'}]
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
  ],

  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 3000
  }
});
