import { program } from "commander";
import init from "./init";

program
  .name("tskit")
  .description("ts starter cli")
  .version("0.0.1", "-v, --version", "current version")
  .option("-e, --edit", "edit mode")
  .option("-d, --dir <char>", "directory")
  .option("-t, --template <type>", "template", "ts")
  .option("-f, --force", "whether force to clear and create the dir");

program.parse();

const options = program.opts();

const targetDir = options.dir || process.cwd();
const targetTemplate = options.template || "ts";

if (!targetDir) throw new Error("no dirctory");

init(targetDir, targetTemplate, options.force);
