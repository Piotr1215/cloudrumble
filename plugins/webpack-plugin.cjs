/* eslint-disable */
const webpack = require('webpack');

module.exports = function (context, options) {
  return {
    name: 'webpack-plugin',
    configureWebpack(config) {
      return {
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
          })
        ],
        resolve: {
          fallback: {
            process: require.resolve('process/browser'),
            buffer: false,
            crypto: false,
            path: false,
            fs: false,
            os: false,
            stream: false,
            util: false
          }
        }
      };
    }
  };
};
