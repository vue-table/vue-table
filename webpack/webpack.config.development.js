const merge = require('webpack-merge');
const common = require('../webpack.config.js')(false);

module.exports = merge(common, {
  devServer: {
    contentBase: 'source/',
    compress: true,
    stats: 'errors-only',
    host: 'localhost',
    port: '5000',
    inline: true,
    open: true
  },

  devtool: 'cheap-inline-module-source-map',
});