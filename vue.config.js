const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  outputDir: "./dist",
  //indexPath: "app.html",
  publicPath: "./",
  configureWebpack: (config) => {
    config.plugins.unshift(
      new CopyWebpackPlugin(
        [{ from: path.join(__dirname, '/static'), to: path.join(__dirname, '/dist'), toType: "dir" }]
      ));
  },
  chainWebpack: config => {
    config.plugin('copy').tap((args) => {
      args[0][0].ignore = ['.DS_Store'];
      return args;
    });
    config.plugin('html').tap((args) => {
      args[0].template = path.join(__dirname, '/public/app.html');
      args[0].filename = 'app.html';
      return args;
    });
  }
}