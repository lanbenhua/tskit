import { program, Option, Argument, OptionValues } from "commander";
import init from "./init";

const dirArgument = new Argument(
  "<dir>",
  "required <char> the ts project directory you want to create"
);

const templateOption = new Option(
  "-t, --template <char>",
  "the template directory you want to create"
)
  .default("ts", "default is ts directory")
  .choices(["ts"]);
const forceOptions = new Option(
  "-f, --force",
  "whether force to clear and create the directory when it is exists"
);

program
  .name("tskit")
  .description("ts starter cli")
  .version("0.0.1", "-v, --version", "print the current version")
  .addArgument(dirArgument)
  .addOption(templateOption)
  .addOption(forceOptions)
  .action((dir: string, options: OptionValues) => {
    const targetDir: string = dir || options.dir;
    const targetTemplate: string = options.template || "ts";

    if (!targetDir) throw new Error("missing required argument 'dir'");
    if (!targetTemplate) throw new Error("missing required option 'template'");

    init(targetDir, targetTemplate, options.force);
  });

program.parse();
