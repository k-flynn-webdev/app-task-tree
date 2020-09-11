process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_NAME = require('./package.json').name

module.exports = {
  lintOnSave: false,
  assetsDir: 'assets',
  productionSourceMap: false,
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    proxy: {
      '/user': {
        target: 'http://127.0.0.1:8600',
        ws: true,
        changeOrigin: true
      },
      '/authentication': {
        target: 'http://127.0.0.1:8600',
        ws: true,
        changeOrigin: true
      }
    }
  }
}