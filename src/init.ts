import fsPromise from "fs/promises";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import { isExists, isDirectory, isFile } from "./utils";

const TEMPLATES_DIR = path.resolve(__dirname, "../templates");

const getTemplateDir = (template: string): string =>
  path.resolve(TEMPLATES_DIR, template);

const copy = (fromDir: string, toDir: string) => {
  if (!isExists(fromDir)) throw new Error(`${fromDir} is not exists.`);
  if (!isDirectory(fromDir)) throw new Error(`${fromDir} is not a directory.`);

  if (!isExists(toDir)) {
    fs.mkdirSync(toDir);
    console.log(chalk.green(`[tss] created '${toDir}'`));
  }
  if (!isDirectory(toDir)) throw new Error(`${toDir} is not a directory.`);

  fsPromise.readdir(fromDir).then((dirChildren) => {
    dirChildren.forEach((dirChild) => {
      const fromPath = path.resolve(fromDir, dirChild);
      const toPath = path.resolve(toDir, dirChild);

      if (isDirectory(fromPath)) return copy(fromPath, toPath);

      if (isFile(fromPath)) {
        fs.openSync(toPath, fs.constants.O_CREAT | fs.constants.O_TRUNC, 0o777);
        console.log(chalk.green(`[tss] created '${toPath}'`));

        fs.createReadStream(fromPath, { mode: 0o777 }).pipe(
          fs.createWriteStream(toPath, { mode: 0o777 })
        );
      }
    });
  });
};

const init = (dir: string, template: string, force?: boolean) => {
  const fullDirPath = path.resolve(process.cwd(), dir);
  const isDirExists = isExists(fullDirPath);

  if (!force && isDirExists)
    throw new Error(
      `${fullDirPath} exists, you can use '--force' or '-f' to force clear the directory.`
    );

  if (force && isDirExists) {
    console.log(chalk.green(`[tss] exists '${fullDirPath}'`));
    fs.rmdirSync(dir, { recursive: true });
    console.log(chalk.green(`[tss] removed '${fullDirPath}'`));
  }

  const templateDir = getTemplateDir(template);

  copy(templateDir, fullDirPath);
};

export default init;
