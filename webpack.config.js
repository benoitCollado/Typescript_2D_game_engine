//webpack.config.js
const path = require('path');

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: {
    main: "./V2/main.ts",
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: "game.js" // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [path.resolve(__dirname,"./avec_webgl")]
      }
    ]
  }
};