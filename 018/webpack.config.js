const path = require('path');
const webpack = require('webpack');
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
    // app: PATHS.app,
    index: PATHS.app + '/index/index.js',
    about: PATHS.app + '/about/about.js',
    vendor: ['react']
  },
  output:{
    path: PATHS.bulid,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  devServer:{
    host: process.env.HOST,
    port: 8080,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  devtool: 'source-map',
  performance: { //代码压缩
    hints: 'warning',
    maxEntrypointSize: 500000, //bytes
    maxAssetSize: 450000
  },
  module: {
    rules: [
      {
        test: /app\/*.js$/,
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
              modules: true,
            },
          },
          fallback : 'style-loader',
        }),
      }
    ]
  },
  plugins: [
    textPlugin,
    new babiliPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      title: '018',
      filename: 'index.html',
      template: PATHS.app+'/index/index.html',
      chunks: ['vendor', 'index'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '018',
      filename: 'about.html',
      template: PATHS.app+'/about/about.html',
      chunks: ['vendor', 'about'],
      inject: 'body'
    })
  ]
};
