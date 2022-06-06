import fsPromise from "fs/promises";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import { isExists, isDirectory, isFile } from "./utils";

const TEMPLATES_DIR = path.resolve(__dirname, "../templates");

const getTemplateDir = (template: string): string =>
  path.resolve(TEMPLATES_DIR, template);

export const copy = (fromDir: string, toDir: string) => {
  if (!isExists(fromDir)) throw new Error(`${fromDir} is not exists.`);
  if (!isDirectory(fromDir)) throw new Error(`${fromDir} is not a directory.`);

  if (!isExists(toDir)) {
    fs.mkdirSync(toDir);
    console.log(chalk.green(`[tskit] created '${toDir}'`));
  }
  if (!isDirectory(toDir)) throw new Error(`${toDir} is not a directory.`);

  fsPromise.readdir(fromDir).then((subFilenames) => {
    subFilenames.forEach((filename) => {
      const fromPath = path.resolve(fromDir, filename);
      const toPath = path.resolve(toDir, filename);

      if (isDirectory(fromPath)) return copy(fromPath, toPath);

      if (isFile(fromPath)) {
        fs.openSync(toPath, fs.constants.O_CREAT | fs.constants.O_TRUNC, 0o777);
        console.log(chalk.green(`[tskit] created '${toPath}'`));

        fs.createReadStream(fromPath, { mode: 0o777 }).pipe(
          fs.createWriteStream(toPath, { mode: 0o777 })
        );
      }
    });
  });
};

const init = (dir: string, template: string, force?: boolean) => {
  const fullpath = path.resolve(process.cwd(), dir);
  const isCurrentDirExists = isExists(fullpath);

  if (!force && isCurrentDirExists)
    throw new Error(
      `${fullpath} exists, you can use '--force' or '-f' to force clear the directory.`
    );

  if (force && isCurrentDirExists) {
    console.log(chalk.green(`[tskit] exists '${fullpath}'`));
    fs.rmSync(dir, { recursive: true });
    console.log(chalk.green(`[tskit] removed '${fullpath}'`));
  }

  const templateDir = getTemplateDir(template);

  copy(templateDir, fullpath);
};

export default init;
