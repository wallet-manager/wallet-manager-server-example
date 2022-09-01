const path = require('path');
//const webpack = require('webpack');
//const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: {
    server: path.join(
      __dirname,
      '../dist/index.js',
    ),
  },
  output: {
    path: path.join(__dirname, '../dist/webpack'),
    globalObject: 'this',
    publicPath: '/',
    filename: 'wallet-manager-server-example.js',
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
    ],
  },
  plugins: [
    //new Dotenv()
  ],
  optimization: {
    minimize: false,
    nodeEnv: false
  }
};
