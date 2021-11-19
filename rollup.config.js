import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "es"
    }
  ],
  external: [
    "solid-js",
    "solid-js/web",
    "@waxio/waxjs",
    "anchor-link",
    "anchor-link-browser-transport"
  ],
  plugins: [
    commonjs(),
    json(),
    nodeResolve({
      extensions: [".js", ".ts", ".tsx"],
      preferBuiltins: true
    }),
    babel({
      extensions: [".js", ".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: ["solid", "@babel/preset-typescript"],
      exclude: "node_modules/**"
    })
  ]
};
