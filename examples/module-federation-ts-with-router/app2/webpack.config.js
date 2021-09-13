const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    port: 1002,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    // historyApiFallback: {
    //   index: '/assets/app2/index.html',
    // },
    hot: false,
    liveReload: false,
  },

  devtool: 'source-map',
  entry: "./src/index",
  output: {
    publicPath: "/assets/app2/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./button": "./src/components/button/button",
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
