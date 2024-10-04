module.exports = {
  entry: "./src/index.ts",
  target: "node",
  output: {
    filename: "index.js",
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
