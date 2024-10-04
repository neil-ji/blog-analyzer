module.exports = {
  entry: {
    index: {
      import: "./src/index.ts",
      library: {
        type: "commonjs",
      },
    },
  },
  target: "node",
  output: {
    filename: "index.js",
    path: __dirname + "/dist",
    clean: true,
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
  externals: ["gray-matter"],
  externalsType: "commonjs",
  // externalsPresets: {
  //   node: true,
  // },
};
