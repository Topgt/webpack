const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  bulid: path.join(__dirname, 'bulid')
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

module.exports = {
  extents,
  getEntries,
  creatHtmlPlugin
};
