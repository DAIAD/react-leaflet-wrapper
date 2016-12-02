var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'cheap-module-source-map', 
  entry: [
    "./example/client.jsx"
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './assets', 
      to: './'
    }])
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + "/example/dist/"
  },
}
