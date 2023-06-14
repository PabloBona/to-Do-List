import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const fileName = fileURLToPath(import.meta.url);

const dirName = path.dirname(fileName);

export default {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: './dist',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(dirName, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
      },
    ],
  },
};
