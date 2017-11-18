module.exports = function () {
  return [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [ 'env' ],
        },
      },
    },
    {
      test: /\.pug$/,
      loader: 'pug-loader',
    },
    {
      test: /\.styl$/,
      loader: 'stylus-loader',
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /favicon\.ico$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'file-loader',
      exclude: /(fonts|node_modules)/,
      options: {
        name: 'images/[name].[ext]?[hash:8]',
      },
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      exclude: /node_modules/,
      options: {
        name: 'images/fonts/[name].[ext]?[hash:8]',
      },
    },
  ];
};