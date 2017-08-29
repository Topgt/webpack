const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');

const PATH = {
  app: path.join(__dirname, 'app'),
  bulid: path.join(__dirname, 'bulid')
};

module.exports = {
  //配置自动刷新的端口。
  devServer: {
    host: process.env.HOST,
    port: 80, //process.env.PORT
    overlay: {
      errors: true,
      warnings: true
    }
  },
  entry: {
    app: PATH.app
  },
  output: {
    path: PATH.bulid,
    filename: '[name].min.js'
  },
  plugins: [
    new htmlwebpackplugin({
      title: 'webpck demo'
    })
  ]
};

/*
笔记：
	浏览器自动刷新：
		$ cnpm install webpack-dev-server -S
		# package.json
		{
			"scripts": {
				"start": "webpack-dev-server --env development",
				"bulid": "webpack --env production"
			}
		}
*/
