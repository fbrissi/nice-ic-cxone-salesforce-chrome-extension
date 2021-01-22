const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    app: path.join(__dirname, 'src', 'index.js'),
    background: path.join(__dirname, 'src', 'background.js'),
    'content-ic': path.join(__dirname, 'src', 'content-ic.js'),
    'content-sf': path.join(__dirname, 'src', 'content-sf.js'),
  },
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
        },
      ],
    }),
    new webpack.ExtendedAPIPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
