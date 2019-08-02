const path = require('path');

module.exports = {
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
  }
};
