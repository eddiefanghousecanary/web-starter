var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var S3Plugin = require('webpack-s3-plugin');

loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'})
});

module.exports = function (env) {
  let plugins = [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js']
      }
    })
  ];

  if (env.deployenv) {
    plugins = [...plugins,
      new CopyWebpackPlugin([
        { from: 'configs/' + env.deployenv + '.js', to: 'config.js' }
      ], {}),
      new S3Plugin({
        // s3Options are required
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: 'us-west-2'
        },
        s3UploadOptions: {
          Bucket: 'order-manager-frontend-' + env.deployenv,
          CacheControl: function (fileName) {
            if (/\.html/.test(fileName) || /config\.js/.test(fileName)) {
              return 'max-age=60';
            }
            return 'max-age=31556926';
          }
        }
      })
    ];
  }
  return {
    entry: [
      './src/index.jsx'
    ],
    output: {
      publicPath: './',
      path: path.join(__dirname, 'build'),
      filename: '[chunkhash].js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      loaders
    },
    plugins: plugins
  };
};
