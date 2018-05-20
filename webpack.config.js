const path = require('path');
// 生成html供浏览器访问
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除上次构建的文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 用于将css用主引用程序中分离, but the webpack of version 4.x not support this plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// webpack4 将css从主程序中分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const config = {
  // mode: 'production | development',
  entry: './src/js/index.js',
  // entry: ['./src/js/index.js', './src/js/main.js'],
  // entry: {
  //   index: './src/js/index.js',
  //   main: './src/js/main.js'
  // },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    // filename: 'index.js',
    filename: '[name].[hash].js', // for multiple entry points
    // filename: '[hash].js',
    publicPath: '/static/',
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '127.0.0.1', //默认localhost，指定后服务器外部可访问
    port: 9000,
    hot: true, //开启热更新
    open: true, //自动用浏览器打开
    // proxy: {
    //   //启用反向代理
    //   "/api": {
    //     target: "https://baidu.com",
    //     pathRewrite: {"^/api" : "/api"}
    //   }
    // },
    // publicPath: '/', //默认'/' 既访问地址为http://localhost:9000/dist/index.js
    contentBase: path.resolve(__dirname, './dist'), //告诉服务器从哪提供内容，publicPath选项优先于contentBase
    // compress: true, //启用gzip压缩 或在CLI中 webpack-dev-server --compress
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],  //test and include have the same behavior, both must be matched
        exclude: [
          path.resolve(__dirname, 'node_modules/')
        ],  // exclude must not matched
        issure:  { test, include, exclude }, // TODO understand
        use: ['babel-loader'],
        options: { // options for the loader
          presets: ['es2015'],
        }, 
      },
      { 
        test: /\.css$/, 
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },
      { 
        test: /\.(jpg|gif|svg|png)$/,
        use: ['file-loader'] 
      }
    ],
  },
  resolve: { // 解决模块请求的选项
    modules: [ // 从哪些文件夹寻找模块
      "node_modules",
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: { // 目录别名
      'module': 'new module',
      // alias 'module/path/file' -> 'new module/path/file'
      'src': path.resolve(__dirname, 'src/'), 
    },
  },
  plugins: [
    new webpack.NamedChunksPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Auto generate',
      filename: 'index.html', //'index.html'...
      // template: '', //ejs, html, jade...
      hash: false, // true ? html文件中引用的js && css 后缀一段hash值
      // inject: '', // true || 'head' || 'body' || false,
      // favicon: '', //favicon path
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}, // 
      cache: false, 
      xhtml: true, //true ? 标签自关闭
    }),
    new CleanWebpackPlugin(['dist']),
    // new ExtractTextPlugin('index.css')
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ]
}


module.exports = config;