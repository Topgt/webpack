const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  bulid: path.join(__dirname, 'bulid')
};

module.exports = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.bulid,
    filename: '[name].js'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'test webpack'
    })
  ]
};
