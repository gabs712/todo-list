const common = require('./webpack.common')
const {merge} = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')

const config = merge(common, {
  mode: 'production',
  devtool: 'source-map', 
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin()
    ]
  },
})

module.exports = config
