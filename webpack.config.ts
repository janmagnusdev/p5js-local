import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpackDevServer from "webpack-dev-server";

import fs from "fs";

module.exports = (): webpack.Configuration => {
  const sketches = fs.readdirSync("./sketches");
  const entries = Object.fromEntries(
    sketches.map((sketch) => {
      return [sketch, `./sketches/${sketch}/main.js`];
    }),
  );
  const htmlPlugins = sketches.map((sketch) => {
    const config = {
      title: sketch,
      template: "./index.html",
      filename: `./${sketch}/index.html`,
      inject: true,
      chunks: [sketch],
    };
    return new HtmlWebpackPlugin(config);
  });

  return {
    mode: "production",
    entry: entries,
    output: {
      path: `${__dirname}/dist/`,
      filename: "[name].js",
    },
    devServer: {
      client: {
        logging: "none",
        overlay: false,
      },
    },
    plugins: [...htmlPlugins],
  };
};
