/* eslint-disable import/no-extraneous-dependencies */
import { nodeResolve } from "@rollup/plugin-node-resolve";
import rollupTypescript from "@rollup/plugin-typescript";
// import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { RollupOptions } from "rollup";
import path from "path";

const cwd = (pathname: string): string => path.resolve(process.cwd(), pathname);

const config: RollupOptions[] = [
  {
    input: cwd("./src/index.ts"),
    plugins: [
      json(),
      commonjs(),
      nodeResolve(),
      rollupTypescript({
        tsconfig: cwd("./tsconfig.json"),
      }),
      // terser(),
    ],
    output: {
      dir: cwd("./lib"),
      sourcemap: true,
      // file: './lib/index.js',
      format: "cjs",
    },
  },
];

export default config;
