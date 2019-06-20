const path = require("path");
const join = path.join;
const resolve = path.resolve;
const webpack = require("webpack");
const tmpdir = require("os").tmpdir;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  favicon: "./favicon.ico",
});
const config = require("./config/env-config");
// mock data
const appData = require("./config/data.json");
const statistic = appData.statistic;
const user = appData.user;
const category = appData.category;

module.exports = {
  entry: "./src/App.jsx",
  resolve: {
    alias: {
      page: path.resolve(__dirname, "src/page"),
      component: path.resolve(__dirname, "src/component"),
      util: path.resolve(__dirname, "src/util"),
      api: path.resolve(__dirname, "src/api"),
    },
    modules: ["node_modules", join(__dirname, "../node_modules")],
    extensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  output: {
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "react",
              [
                "env",
                {
                  targets: {
                    browsers: [">0.25%", "not ie 11", "not op_mini all"],
                  },
                },
              ],
            ],
            cacheDirectory: true,
            cacheDirectory: tmpdir(),
            presets: [
              require.resolve("babel-preset-es2015-ie"),
              require.resolve("babel-preset-react"),
              require.resolve("babel-preset-stage-0"),
            ],
            plugins: [
              require.resolve("babel-plugin-add-module-exports"),
              require.resolve("babel-plugin-transform-decorators-legacy"),
              require.resolve("babel-plugin-transform-runtime"),
              ["import", {libraryName: "antd", libraryDirectory: "es", style: "css"}],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(eot|woff|woff2|ttf)/,
        loader: "url-loader?limit=30000&name=fonts/[hash:8].[name].[ext]",
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("dart-sass"),
            },
          },

          {
            loader: "sass-resources-loader",
            options: {
              resources: "./src/style/resources.scss",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
    hot: true, //设置这里
    host: "0.0.0.0",
    historyApiFallback: true,
    before(app) {
      app.get("/api/statistic", function (req, res) {
        res.json(statistic);
      });
    },
    proxy: {
      "/manage": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,     // target是域名的话，需要这个参数
      },
    },
  },
  plugins: [
    htmlPlugin,
    new webpack.DefinePlugin({
      "process.env.BASE_URL": "\"" + process.env.BASE_URL + "\"",
    }),
  ],
};
