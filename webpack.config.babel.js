import path from 'path';
import webpack from 'webpack';
import Uglify from 'uglifyjs-webpack-plugin';

const config = {
  devtool: 'source-map',
  entry: {
    background: './src/js/background',
    content: './src/js/content',
    options: './src/js/options'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      process: '0'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new Uglify({
      sourceMap: false,
      uglifyOptions: {
        mangle: true,
        output: {
          beautify: false
        }
      }
    }));
} else {
  config.plugins.push(
    new Uglify({
      sourceMap: true,
      uglifyOptions: {
        mangle: false,
        output: {
          beautify: true
        }
      }
    }));
}

export default config;
