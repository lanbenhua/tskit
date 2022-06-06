'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commander_1 = require("commander");
var init_1 = tslib_1.__importDefault(require("./init"));
var dirArgument = new commander_1.Argument("<dir>", "required <char> the ts project directory you want to create");
var templateOption = new commander_1.Option("-t, --template <char>", "the template directory you want to create").default("ts", "default is ts directory").choices(["ts"]);
var forceOptions = new commander_1.Option("-f, --force", "whether force to clear and create the directory when it is exists");
commander_1.program
    .name("tskit")
    .description("ts starter cli")
    .version("0.0.1", "-v, --version", "print the current version")
    .addArgument(dirArgument)
    .addOption(templateOption)
    .addOption(forceOptions)
    .action(function (dir, options) {
    var targetDir = dir || options.dir;
    var targetTemplate = options.template || "ts";
    if (!targetDir)
        throw new Error("missing required argument 'dir'");
    if (!targetTemplate)
        throw new Error("missing required option 'template'");
    (0, init_1.default)(targetDir, targetTemplate, options.force);
});
commander_1.program.parse();
