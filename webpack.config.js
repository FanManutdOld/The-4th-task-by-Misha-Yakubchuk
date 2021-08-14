const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
// const isProd = !isDev;

module.exports = {
  entry: {
    'demo-page': path.join(__dirname, 'src/demo/pages/demo-page/index.ts'),
    'more-sliders': path.join(__dirname, 'src/demo/pages/more-sliders/index.ts'),
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      grid: true,
                    },
                  ],
                  'cssnano',
                ],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'demo-page.html',
      template: 'src/demo/pages/demo-page/demo-page.pug',
      chunks: ['demo-page'],
    }),
    new HtmlWebpackPlugin({
      filename: 'more-sliders.html',
      template: 'src/demo/pages/more-sliders/more-sliders.pug',
      chunks: ['more-sliders'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],

  devServer: {
    index: 'demo-page.html',
  },
};
