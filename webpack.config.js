const path = require('path');

module.exports = {
  entry: ['./js/index.js', './libs/tau/wearable/js/tau'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, ''),
  },
};