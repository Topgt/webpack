const path = require('path');
const htmWebpackPlugin = require('html-webpack-plugin');

const PATH = {
    app: path.join(__dirname, 'app'),
    bulid: path.join(__dirname, 'bulid')
};

module.exports = {
    entry: {
        app: PATH.app
    },
    output: {
        path: PATH.bulid,
        filename: '[name].min.js'
    },
    plugins: [
        new htmWebpackPlugin({
            title: 'webpack demo'
        })
    ]
};
