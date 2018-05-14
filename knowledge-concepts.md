# 核心概念

* entry

  -> 为webpack指定一个模块作为构建内部依赖图的开始
  ```
    module.exports = {
      entry: './src/entry/index.js'
    }
  ```
* output

  -> 为webpack指定输出的bundles文件位置（默认为`./dist`）
  ````
    const path = require('path');
    module.exports = {
      entry: './src/entry/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        // path.resolve('/foo/bar/', 'dist') -> /foo/bar/dist
        filename: 'index.bundle.js'
      }
    }
  ````
* loader

  -> loader让webpack能够处理非JavaScript文件（webpack自身只能理解JavaScript），loader可以将所有类型的文件转换为webpack能够处理的有效模块，再利用webpack的打包能力对文件进行处理。
  -> webpack配置loader有两个目标：
  * `test`属性： 用于表示出应该被对应的loader进行转换的某些文件
  * `use`属性： 表示进行转换时，应该使用哪个loader对这些文件进行处理
  ````
    const config = {
      module: {
        rules: [
          {test: /\.txt$/, use: 'raw-loader'}
        ]
      }
    }
  ````
  -> 在配置项中定义一个module对象有个rules（Array）属性,数组项中的对象必须包含t`test`和`use`属性
  -> 原理：webpack在解析require('*.txt')/import * from '*.txt'语句时，在对该文件打包之前，先使用`raw-loader`转换一下
* plugins

  * -> 可执行打包优化、压缩代码、重新定义环境变量、插件接口等各种任务
  * -> 想使用一个插件，就`require()`它，然后把它添加到`plugins`数组中。
  * -> 多数插件克通过`option`选项来自定义，也可以在配置文件中因不同目的多次使用同一个插件，这时需要通过`new`操作符来创建它的一个实例
  ````
    const HtmlWepackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack');
    const config = {
      module: {
        rules: [
          { test: /\.txt$/, use: 'raw-loader'}
        ] 
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
      ]
    };
    module.exports = config;
  ````
* mode 

  -> 通过选择`development`或`production`之中的一个，来设置`mode`参数，可以启用相应模式下的webpack内置优化
  ````
    module.exports = {
      mode: 'production'
    }
  ````  