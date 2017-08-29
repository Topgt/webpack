const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  bulid: path.join(__dirname, 'bulid')
};

module.exports = {
  devServer: {
    host: process.env.host,
    port: 80,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.bulid,
    filename: '[name].js'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'webpck demo'
    })
  ]
};
