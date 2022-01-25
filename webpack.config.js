const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: "source-map",
  plugins: [new webpack.ProgressPlugin()],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
