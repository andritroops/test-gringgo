const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new Dotenv({
      path: "./.env.production",
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, './dist'),
    publicPath: "/",
  },
});
