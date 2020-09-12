const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const packageJson = require('./package.json');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'index.js'),
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'public', 'index.html'),
      publicUrl: `${process.env.PUBLIC_URL ?? ''}`,
      version: `${packageJson.version}`,
    }),
    new FixStyleOnlyEntriesPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/**/*',
          flatten: true,
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
};
