#核心概念
* entry
  -> 为webpack指定一个模块作为构建内部依赖图的开始
  <code>
    module.exports = {
      entry: './src/entry/index.js'
    }
  </code>
* output
  -> 为webpack指定输出的bundles文件位置（默认为./dist）
  <code>
    const path = require('path');
    module.exports = {
      entry: './src/entry/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
      }
    }
  </code>
* loader
  -> loader让webpack能够处理非JavaScript文件（webpack自身只能理解JavaScript），loader可以将所有类型的文件转换为webpack能够处理的有效模块，再利用webpack的打包能力对文件进行处理。
  -> webpack配置loader有两个目标：
  * `test`属性： 用于表示出应该被对应的loader进行转换的某些文件
  * `use`属性： 表示进行转换时，应该使用哪个loader对这些文件进行处理
  <code>
    const config = {
      module: {
        rules: [
          {test: /\.txt$/, use: 'raw-loader'}
        ]
      }
    }
  </code>
  -> 在配置项中定义一个module对象有个rules（Array）属性,数组项中的对象必须包含t`test`和`use`属性
  -> 原理：webpack在解析require('*.txt')/import * from '*.txt'语句时，在对该文件打包之前，先使用`raw-loader`转换一下
* plugin
  ->