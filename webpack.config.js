var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, args) => {
  return {
  entry: {index: "./src/index.ts"},
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve:  {
    fallback: {
      crypto: false,
    },
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.ts',
      '.js',
      '.jsx',
      '.tsx',
      '.json',
      '.css',
      '.scss',
    ],
    modules: ['src', 'node_modules'], // Assuming that your files are inside the src dir
  },
  
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
    proxy: [{
      context: ['/'],
      target: 'http://localhost:8095/EntityMetaService'
    }]
  },


  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['index']
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ]
}};