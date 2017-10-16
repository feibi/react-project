const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HappyPack = require('happypack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const { names } = require('./public.config');
const { buildName } = names;

const manifestPath = path.join(__dirname, buildName, 'vendor-manifest.json');

const dashboard = new Dashboard();
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });
const happypackLoaderPath = path.resolve(
  __dirname,
  './node_modules',
  'happypack/loader'
);

const port = process.env.npm_package_config_port || 3000;
const host = process.env.npm_package_config_host || 'localhost';

module.exports = {
  entry: {
    index: [
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './src/index'
    ]
  },
  output: {
    path: path.resolve(__dirname, buildName),
    filename: 'js/[name]-[hash:8].js',
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
    chunkFilename: 'js/page.[name]-[chunkhash:8].js',
    publicPath: '/', // string
    // 输出解析文件的目录，url 相对于 HTML 页面
    library: '[name]' // string,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, 'src')],
        use: happypackLoaderPath + '?id=js'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: happypackLoaderPath + '?id=css'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: happypackLoaderPath + '?id=less'
        })
      }
    ]
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js', '.json', '.jsx', '.css', '.less'],
    // 使用的扩展名
    alias: {
      //"module": path.resolve(__dirname, "app/third/module.js"),
    }
  },
  devtool: 'eval-source-map', // enum
  context: __dirname, // string（绝对路径！）
  target: 'web', // 枚举
  //externals: ["react"],
  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

  //stats: "errors-only",
  // 精确控制要显示的 bundle 信息

  plugins: [
    // 构建优化插件
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: ['css-loader']
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader']
    }),
    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      loaders: [
        {
          path: 'css-loader',
          query: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        },
        'less-loader'
      ]
    }),
    new DashboardPlugin(dashboard.setData),
    new HtmlwebpackPlugin({
      template: __dirname + '/assets/index.html', //html模板路径
      filename: 'index.html',
      //bundleName: 'vendors.dll.js',
      inject: true, //允许插件修改哪些内容，包括head与body
      hash: false //为静态资源生成hash值
    }), //添加我们的插件 会自动生成一个html文件
    new webpack.DllReferencePlugin({
      context: __dirname,
      /**
       * 在这里引入 manifest 文件
       */
      manifest: require(manifestPath)
      //name:'[name]'
    }),
    new AddAssetHtmlPlugin({
      filepath: path.join(__dirname, buildName, '*.dll.js')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name]-[hash:8].js',
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: 'style/style.[hash:8].css',
      allChunks: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEVTOOLS__: true
    }),
    // webpack-dev-server 强化插件
    //  new DashboardPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
