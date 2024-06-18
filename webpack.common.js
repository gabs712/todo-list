const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlTemplates = [
  './src/index.html',
]

const config = {
  entry: ['./src/js/main.js', './src/sass/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].bundle.js'
  },
  devServer: {
    static: './dist',
    watchFiles: [
      ...htmlTemplates
    ]
  },
  stats: {
    preset: 'minimal',
    loggingDebug: ["sass-loader"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.s[ca]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.html$/i,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
    ],
  },
  plugins: [
    ...generateHtmlPlugins(htmlTemplates),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    })
  ],
}

function generateHtmlPlugins(templates) {
  const plugins = []
  for (const template of templates) {
    plugins.push(
      new HtmlWebpackPlugin({
        template: template,
        scriptLoading: 'module',
      })
    )
  }
  return plugins
}

module.exports = config
