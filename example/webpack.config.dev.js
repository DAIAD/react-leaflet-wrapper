var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var HOST = process.env.HOT_LOAD_HOST || 'localhost';
var HOTLOADPORT = process.env.HOT_LOAD_PORT || 8089;

module.exports = {
  context: __dirname + "/../",
  devtool: 'eval', 
  entry: [
    "webpack-dev-server/client?http://0.0.0.0:" + HOTLOADPORT,
    "webpack/hot/only-dev-server",
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
        loaders: ["react-hot", "babel-loader"],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: './example/assets', 
      to: './'
    }])
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist/",
    publicPath: 'http://' + HOST + ':' + HOTLOADPORT + '/dist/'
  },
}
