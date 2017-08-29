const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  bulid: path.join(__dirname, 'bulid')
};

module.exports = {
  entry: {
    app: PATHS.app
  },
  output:{
    path: PATHS.bulid,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        conforce: 'pre',

        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '009'
    })
  ]
};
