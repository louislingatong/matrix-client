const path = require('path');
const webpack = require('webpack');

const settings = {
  distPath: path.join(__dirname, 'dist'),
  srcPath: path.join(__dirname, 'src'),
  publicPath: path.join(__dirname, 'public')
};

const srcFile = (filename) => {
  return path.join(settings.srcPath, filename)
};

const config = {
  entry: {
    main: srcFile('index.js'),
    vendor: srcFile('assets/js/main.js')
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'REACT_APP_API_URL': 'http://localhost:8000/',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 'useBuiltIns': 'usage', 'corejs': 3, 'targets': 'defaults' }],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              'emotion'
            ]
          }
        }
      },
      {
        test:/\.html$/,
        use: ['html-loader']
      },
      {
        test:/\.(svg|png|jpg|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'images',
          }
        }
      }
    ]
  }
}
{
  module.exports = {
    config,
    settings
  }
}