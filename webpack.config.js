const path = require('path');
// 生成html供浏览器访问
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除上次构建的文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin'); 

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0', //默认localhost，指定后服务器外部可访问
    port: 9000,
    hot: true, //开启热更新
    open: true, //自动用浏览器打开
    proxy: {
      //启用反向代理
      "/api": {
        target: "https://baidu.com",
        pathRewrite: {"^/api" : "/api"}
      }
    },
    publicPath: '/dist', //默认'/' 既访问地址为http://localhost:9000/dist/index.js
    contentBase: path.resolve(__dirname, 'dist'), //告诉服务器从哪提供内容，publicPath选项优先于contentBase
    compress: true, //启用gzip压缩 或在CLI中 webpack-dev-server --compress
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(jpg|gif|svg|png)$/, use: ['file-loader'] }
    ]
  },
  plugins: [
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
    new CleanWebpackPlugin(['dist'])
  ]
}

console.log(config);

module.exports = config;