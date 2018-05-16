const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const config = merge(baseConfig, {
  plugins: [
    new UglifyjsWebpackPlugin()
  ]
})
module.exports = config;