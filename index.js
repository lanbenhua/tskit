'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commander_1 = require("commander");
var init_1 = tslib_1.__importDefault(require("./init"));
commander_1.program
    .name('tss')
    .description('ts starter cli')
    .version("0.0.1", '-v, --version', 'current version')
    .option("-e, --edit", "edit mode")
    .option("-d, --dir <char>", "directory")
    .option("-f, --force", "whether force to clear and create the dir");
commander_1.program.parse();
var options = commander_1.program.opts();
var targetDir = options.dir || process.cwd();
if (!targetDir)
    throw new Error('no dirctory');
(0, init_1.default)(targetDir, options.force);
