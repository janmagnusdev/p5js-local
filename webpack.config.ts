import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpackDevServer from "webpack-dev-server";

import fs from "fs";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";


module.exports = (): webpack.Configuration => {
  const sketches = fs.readdirSync("./sketches");
  const entries = Object.fromEntries(
      sketches.map((sketch) => {
        return [sketch, `./sketches/${sketch}/main`];
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
  const htmlLinks = htmlPlugins.map((htmlPlugin): string => {
    return htmlPlugin.options.filename
  });
  console.log(htmlLinks)
  const landingPageHtmlPlugin = new HtmlWebpackPlugin({
    title: "Landing Page",
    template: "./landing.index.ejs",
    filename: `./index.html`,
    templateParameters: {htmlLinks: htmlLinks},
    inject: false
  })

  return {
    cache: {
      type: "filesystem"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          include: path.resolve(__dirname, "sketches")
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
          include: [path.resolve(__dirname, "sketches"), path.resolve(__dirname, "css.css")]
        },
      ],
    },
    // resolve ts first if js has been found as well
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      symlinks: false,
    },
    mode: "development",
    entry: entries,
    output: {
      path: `${__dirname}/dist/`,
      filename: "[name].js",
    },
    devtool: "eval-cheap-module-source-map",
    devServer: {
      client: {
        logging: "none",
        overlay: false,
      },
    },
    plugins: [...htmlPlugins, new CopyPlugin({
      patterns: [
        {from: "./css.css", to: "css.css"},
      ],
    }), landingPageHtmlPlugin],
  };
};
