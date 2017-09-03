const path = require('path');
let glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

let creatHtmlPlugin = function(pageName){
  let chunks = ['vendor'];
  chunks.push(pageName);
  let filename = pageName+'.html';
  return new HtmlWebpackPlugin({  //按模版生成入口html
    title: pageName,
    filename: filename,
    template: PATHS.app+'/'+pageName+'/'+pageName+'.html',
    chunks: chunks,
    inject: 'body'
  });
};

let extents = function() {
  let isObj = arguments[0]instanceof Object;
  let obj = isObj && arguments[0] || arguments[1];
  let check = !isObj && arguments[0];
  let i = isObj && 1 || 2;
  for (i; i < arguments.length; i++) {
    let tmp = arguments[i];
    if (check) {
      for (let attr in tmp) {
        if (tmp[attr]instanceof Object && obj[attr]instanceof Object) {
          extents(true, obj[attr], tmp[attr]);
        } else {
          obj[attr] = tmp[attr];
        }
      }
    } else {
      for (let attr in tmp) {
        obj[attr] = tmp[attr];
      }
    }
  }
  return obj;
};

let getEntries = function(globPath) {
  let files = glob.sync(globPath),
    entries = {};

  files.forEach(function(filepath) {
    // 取倒数第二层(view下面的文件夹)做包名
    let split = filepath.split('/');
    let name = split[split.length - 2];

    entries[name] = filepath;
  });
  return entries;
};
let filepath = path.join(__dirname, '/app/**/index.js');
let entries = getEntries(filepath);
extents(options.entry, entries);
for(let pageName in entries)
  options.plugins.push(creatHtmlPlugin(pageName));

// console.log(options);




module.exports = options;
