const path = require('path');
const webpack = require('webpack');
const { names } = require('./public.config');

const isDev = process.env.NODE_ENV === 'development';
const buildDir = isDev ? names.buildName : names.distName;

const vendors = [
  'history',
  'qs',
  'react',
  'redux',
  'react-dom',
  'react-router',
  'react-redux',
  'redux-saga'
];
let plugins = [
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
    path: path.join(__dirname, buildDir, '[name]-manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
    name: '[name]_[hash]'
  })
];

if (!isDev) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    })
  );
}

module.exports = {
  devtool: '#source-map',
  entry: {
    [names.dllName]: vendors
  },
  output: {
    path: path.join(__dirname, buildDir),
    filename: '[name].[hash:4].dll.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_[hash]'
  },
  plugins: plugins
};
