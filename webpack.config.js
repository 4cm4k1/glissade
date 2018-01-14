const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const extractSass = new ExtractPlugin({
  allChunks: true,
  disable: process.env.NODE_ENV === ('development' || undefined),
  filename: 'content.css',
});

const config = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  entry: {
    background: './js/background',
    content: './js/content',
    options: './js/options',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      process: '0',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyPlugin([
      {
        from: '*.json',
      },
      {
        from: '*.html',
      },
      {
        from: 'webp/*.webp',
      },
    ]),
    extractSass,
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        mangle: true,
        output: {
          beautify: false,
        },
      },
    }),
  );
} else {
  config.plugins.push(
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: false,
        output: {
          beautify: true,
        },
      },
    }),
  );
}

export default config;
