const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const babiliPlugin = require('babili-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  bulid: path.join(__dirname, 'bulid')
};

const textPlugin = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true
});

module.exports = {
  entry: {
    app: PATHS.app
  },
  output:{
    path: PATHS.bulid,
    filename: '[name].js'
  },
  devServer:{
    host: process.env.HOST,
    port: 8080,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  performance: { //代码压缩
    hints: 'warning',
    maxEntrypointSize: 10000, //bytes
    maxAssetSize: 45000
  },
  module: {
    rules: [
      {
        test: /app\/ webpack.*.js$/,
        enforce: 'pre',

        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },{
        test: /\.css$/,
        exclude: /node_modules/,
        use: textPlugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true
            },
          },
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '013'
    }),
    textPlugin,
    new babiliPlugin
  ]
};
