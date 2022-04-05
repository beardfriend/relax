const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './apps/server-hire/src/app.ts',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  target: 'node',

  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
    alias: {
      '@SH/env': path.resolve(__dirname, './apps/server-hire/src/env.ts'),
      '@SH/Initializations': path.resolve(__dirname, './apps/server-hire/src/initialzations'),
      '@SH/Entities': path.resolve(__dirname, './apps/server-hire/src/entities'),
      '@SH/Controllers': path.resolve(__dirname, './apps/server-hire/src/controllers'),
      '@SH/Services': path.resolve(__dirname, './apps/server-hire/src/services'),
      '@SH/Routers': path.resolve(__dirname, './apps/server-hire/src/routers'),
      '@SH/MiddleWares': path.resolve(__dirname, './apps/server-hire/src/middlewares'),
      '@Libs': path.resolve(__dirname, './libs'),
      '@Constants/Types': path.resolve(__dirname, './libs/constants/types/index.ts'),
      '@Constants/Messages': path.resolve(__dirname, './libs/constants/messages/index.ts'),
    },
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, './apps/server-hire/tsconfig.build.json'),
            },
          },
        ],
      },
    ],
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      additionalModuleDirs: [
        path.resolve(__dirname, './apps/server-hire/node_modules'),
        path.resolve(__dirname, './libs/entites'),
        path.resolve(__dirname, './tests'),
        path.resolve(__dirname, './apps/client-hire'),
      ],
    }),
  ],
  optimization: {
    minimize: false,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
