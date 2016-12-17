var webpack = require('webpack');

var HOST = process.env.HOT_LOAD_HOST || 'localhost';
var HOTLOADPORT = process.env.HOT_LOAD_PORT || 8089;

module.exports = {
  context: __dirname + "/",
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
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + "/example/dist/",
    publicPath: 'http://' + HOST + ':' + HOTLOADPORT + '/example/dist/'
  },
}
