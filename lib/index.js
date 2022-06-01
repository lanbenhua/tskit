const { program } = require("commander");
program
    .option("-i", "edit mode", false)
    .option("--dir", "directory")
    .option("--s", "s");
program.parse();
const options = program.opts();
console.log(process.argv.slice(2), options, program.args);
