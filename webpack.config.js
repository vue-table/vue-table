const webpack = require ('webpack');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const loaders = require ('./webpack/webpack.config.loaders') ();

const devFolder = 'source';
const prodFolder = 'dist';

module.exports = ( prodaction ) => {

  loaders.push ({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract ({
      fallback: 'style-loader',
      use: [ {
        loader: 'css-loader',
        options: {
          minimize: prodaction,
          sourcemap: !prodaction,
        },
      }, {
        loader: 'sass-loader',
      } ],
    }),
  });

  return {
    entry: {
      'main': `./${devFolder}/main.js`,
    },

    output: {
      path: `${__dirname}/${prodFolder}`,
      filename: '[name].bundle.js',
    },

    module: {
      loaders,
    },

    resolve: {
      alias: {
        vue: 'vue/dist/vue.js',
      },
    },

    plugins: [
      new CleanWebpackPlugin ([ 'dist' ]),

      new HtmlWebpackPlugin ({
        template: `./${devFolder}/index.pug`,
        minify: {
          collapseWhitespace: prodaction,
        },
        hash: true,
      }),

      // new webpack.LoaderOptionsPlugin ({
      //   vue: {
      //     loaders: {
      //       pug: 'pug-loader',
      //       stylus: 'style-loader!css-loader!stylus-loader',
      //     },
      //   },
      // }),

      new ExtractTextPlugin ({
        filename: 'style.css',
      }),

      new webpack.optimize.CommonsChunkPlugin ({
        name: 'common',
      }),
    ],
  };
}
;