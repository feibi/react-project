const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const DashboardPlugin = require('webpack-dashboard/plugin');

const vendors = [
  'react', 'react-dom'
  // ...其它库
];
module.exports = {
  entry: {
    index: [
      'webpack-dev-server/client?http://0.0.0.0:8888', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      'react-hot-loader/patch', // RHL patch
      './src/index' // Your appʼs entry point
    ],
    "vendor": vendors
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/[name]-[hash:8].js',
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
    chunkFilename: 'js/page.[name]-[chunkhash:8].js',
    publicPath: "/", // string
    // 输出解析文件的目录，url 相对于 HTML 页面
    library: "[name]", // string,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "src")],
        use: ['react-hot-loader/webpack', 'babel-loader']
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader?modules"})
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [
      ".js", ".json", ".jsx", ".css", ".less"
    ],
    // 使用的扩展名
    alias: {
      //"module": path.resolve(__dirname, "app/third/module.js"),
    }
  },
  devtool: "eval-source-map", // enum
  context: __dirname, // string（绝对路径！）
  target: "web", // 枚举
  //externals: ["react"],
  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

  //stats: "errors-only",
  // 精确控制要显示的 bundle 信息

  plugins: [
    // 构建优化插件
    new HtmlwebpackPlugin({
      template: __dirname + '/assets/index.html', //html模板路径
      filename: 'index.html',
      bundleName: 'vendors.dll.js',
      inject: true, //允许插件修改哪些内容，包括head与body
      hash: false //为静态资源生成hash值
    }), //添加我们的插件 会自动生成一个html文件
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/[name]-[hash:8].js', minChunks: Infinity}),
    new ExtractTextPlugin({filename: 'style/build.min.css', allChunks: true}),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   /**
    //    * 在这里引入 manifest 文件
    //    */
    //   manifest: require('./dist/vendor-manifest.json'),
    //   //name:'[name]'
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify("development"), __DEVTOOLS__: true}),
    // webpack-dev-server 强化插件
    //  new DashboardPlugin(),
    new webpack.LoaderOptionsPlugin({debug: true}),
    new webpack.HotModuleReplacementPlugin()
  ]
}
