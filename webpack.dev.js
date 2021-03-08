const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { config, settings } = require('./webpack.common');
const { merge } = require('webpack-merge');

const publicFile = (filename) => {
  return path.join(settings.publicPath, filename)
};

module.exports = merge(config, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: settings.distPath,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: publicFile('favicon.ico'),
      title: 'Matrix',
      template: publicFile('index.html')
    }),
  ],
  module: {
    rules: [
      {
        test:/\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  devtool: 'eval-cheap-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: settings.distPath,
    port: 3000
  }
})