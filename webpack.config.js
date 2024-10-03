module.exports = {
  entry: "./src/index.ts",
  target: "node",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
  externals: "gray-matter",
};
