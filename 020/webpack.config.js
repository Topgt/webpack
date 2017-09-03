const util = require('./util.js');
const extents = util.extents;
const getEntries = util.getEntries;
const creatHtmlPlugin = util.creatHtmlPlugin;
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const babiliPlugin = require('babili-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  bulid: path.join(__dirname, 'bulid')
};

//把(.js|jsx)$文件中用到的css抽出来到单独文件中
const textPlugin = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true
});

let options = {
  entry: {
    // app: PATHS.app,
    // index: PATHS.app + '/index/index.js', //入口的js文件
    // about: PATHS.app + '/about/about.js',
    vendor: ['react']      //打包是不进行处理的文件，某些框架文件。我们并不希望一起打包到一个文件中
  },
  output:{
    path: PATHS.bulid,     //打包后输出的位置
    filename: '[name].js'  //打包后的文件名name与entry中的名字相同
  },
  //配置自动刷新功能和局部加载
  devServer:{
    host: process.env.HOST,
    port: 8080,
    overlay: {
      errors: true,
      warnings: true
    },
    hotOnly: true
  },
  devtool: 'source-map',   //方便调试，压缩后能定位源代码的位置，打断点
  performance: { //代码压缩
    hints: 'warning',
    maxEntrypointSize: 500000, //bytes
    maxAssetSize: 450000
  },
  module: {
    rules: [    //loaders 规定各类文件的处理方式
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
    new babiliPlugin(),  //压缩文件
    new webpack.optimize.CommonsChunkPlugin({   //优化打包后的文件，比如模块是公用的
      name: 'vendor'
    })
    // new HtmlWebpackPlugin({  //按模版生成入口html
    //   title: '018',
    //   filename: 'index.html',
    //   template: PATHS.app+'/index/index.html',
    //   chunks: ['vendor', 'index'],
    //   inject: 'body'
    // }),
    // new HtmlWebpackPlugin({
    //   title: '018',
    //   filename: 'about.html',
    //   template: PATHS.app+'/about/about.html',
    //   chunks: ['vendor', 'about'],
    //   inject: 'body'
    // })
  ]
};





let filepath = path.join(__dirname, '/app/**/index.js');
let entries = getEntries(filepath);
extents(options.entry, entries);
for(let pageName in entries)
  options.plugins.push(creatHtmlPlugin(pageName));


module.exports = options;
