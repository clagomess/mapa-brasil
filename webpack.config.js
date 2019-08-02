const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",

  entry: {
    "mapa-brasil": './src/mapa-brasil.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: 'MapaBrasil',
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{from: 'data', to: 'data'}]),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
};
