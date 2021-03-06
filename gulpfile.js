let gulp = require('gulp'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence'),
  gutil = require('gulp-util');

let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');

const port = process.env.npm_package_config_port || 3000;
const host = process.env.npm_package_config_host || 'localhost';

gulp.task('default', ['webpack-dev-server']);

gulp.task('clean', function() {
  return gulp.src(['build', 'dist'], { read: false }).pipe(clean());
});

gulp.task('webpack-dev-server', function(callback) {
  // modify some webpack config
  // options
  let webpackConfig = require('./webpack.config.js');
  let myConfig = Object.create(webpackConfig);
  // myConfig.devtool = "eval";
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    contentBase: './build/',
    publicPath: '/',
    stats: {
      colors: true,
      version: true,
      usedExports: true
    },
    hot: true,
    compress: true,
    inline: true,
    quiet: true,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/personal*': {
        target: 'http://www.baidu.com',
        secure: false,
        changeOrigin: true
      },
      '/api/*': {
        target: 'http://192.168.1.2:9090/',
        secure: false,
        changeOrigin: true
      }
    }
  }).listen(port, host, function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log(
      '[webpack-dev-server]',
      `http://${host}:${port}/webpack-dev-server/index.html`
    );
  });
});

// Production build
gulp.task('build', function() {
  runSequence(['webpack:build']);
});

gulp.task('webpack:build', function(callback) {
  let webpackserver = require('./webpack.prod.config.js');
  let myConfig = Object.create(webpackserver);
  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({ colors: true }));
    callback();
  });
});
