const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'src'),
        port: 3010,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    plugins: [
        new Dotenv()
    ],
    output: {
        clean: false,
        filename: 'bundle.js',
        path: path.join(__dirname,'/dist'),
        publicPath: '/',
    },
});