var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

var HOST = process.env.HOT_LOAD_HOST || 'localhost';
var HOTLOADPORT = process.env.HOT_LOAD_PORT || 8089;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(HOTLOADPORT, HOST, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('HotLoadServer listening at ' + HOST + ':' + HOTLOADPORT);
});
