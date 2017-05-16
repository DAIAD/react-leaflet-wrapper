var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [
    "./example/client.jsx"
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
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
    publicPath: '/dist/',
    path: __dirname + "/dist/"
  },
}
