const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./index.js', './libs/tau/wearable/js/tau'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, ''),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    fallback: {
      util: require.resolve("util/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};