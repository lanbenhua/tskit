import { nodeResolve } from "@rollup/plugin-node-resolve";
import rollupTypescript from "@rollup/plugin-typescript";
// import { terser } from "rollup-plugin-terser";
import path from "path";

const cwd = (pathname) => path.resolve(process.cwd(), pathname);

const config = [
  {
    input: cwd("./src/index.ts"),
    plugins: [
      nodeResolve(),
      rollupTypescript({
        tsconfig: cwd("./tsconfig.json"),
      }),
      // terser(),
    ],
    output: {
      dir: cwd("./lib"),
      format: "es",
    },
  },
];

export default config;
