const path = require('path');

module.exports = {
    outputDir: "/app",
    publicPath: "/app",
    configureWebpack: {
    resolve: {
      alias: {
        '@': __dirname + '/src/app'
      }
    },
    entry: {
      app: './src/app/main.js'
    }
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((opts) => {
            opts[0].template= path.resolve('public/app/index.html');
            return opts;
      });
  },
}