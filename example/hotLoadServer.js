var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

var HOST = 'localhost';
var HOTLOADPORT = 8089;

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
