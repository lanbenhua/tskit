import { program } from "commander";

program
  .version("0.0.1")
  .option("-e, --edit", "edit mode")
  .option("-d, --dir <type>", "directory");

program.parse();

const options = program.opts();
console.log(options);
