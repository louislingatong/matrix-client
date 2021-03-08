const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { config, settings } = require('./webpack.common');
const { merge } = require('webpack-merge');

const publicFile = (filename) => {
  return path.join(settings.publicPath, filename)
};

module.exports = merge(config, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].bundle.js',
    path: settings.distPath,
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      new HtmlWebpackPlugin({
        favicon: publicFile('favicon.ico'),
        title: 'Matrix',
        template: publicFile('index.html'),
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      }),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
  ],
  module: {
    rules: [
      {
        test:/\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  }
})