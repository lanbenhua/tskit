import chalk from "chalk";
import path from "path";
import fs from "fs";
import { isExists, isDirectory, isFile } from "./utils";

const getTplDir = (tpl: string): string =>
  path.resolve(__dirname, "../templates", tpl);

export const copy = async (fromDir: string, toDir: string) => {
  if (!isExists(fromDir)) throw new Error(`${fromDir} is not exists`);
  if (!isDirectory(fromDir)) throw new Error(`${fromDir} is not a directory`);

  if (!isExists(toDir)) {
    await fs.promises.mkdir(toDir, { mode: 0o777 });
    console.log(chalk.green(`[tskit] created dir: '${toDir}'`));
  }
  if (!isDirectory(toDir)) throw new Error(`${toDir} is not a directory`);

  const subFilenames = await fs.promises.readdir(fromDir);

  subFilenames.forEach(async (filename) => {
    const fromPath = path.resolve(fromDir, filename);
    const toPath = path.resolve(toDir, filename);

    if (isDirectory(fromPath)) {
      await copy(fromPath, toPath);
      return;
    }

    if (isFile(fromPath)) {
      fs.openSync(
        toPath,
        fs.constants.O_RDWR | fs.constants.O_CREAT | fs.constants.O_TRUNC,
        0o777
      );
      console.log(chalk.green(`[tskit] created file: '${toPath}'`));

      fs.createReadStream(fromPath, { mode: 0o777 }).pipe(
        fs.createWriteStream(toPath, { mode: 0o777 })
      );
    }
  });
};

const init = async (dir: string, template: string, force?: boolean) => {
  const fullpath = path.resolve(process.cwd(), dir);
  const isCurrentDirExists = isExists(fullpath);

  if (!force && isCurrentDirExists)
    throw new Error(
      `${fullpath} exists, you can use '--force' or '-f' to force clear the directory`
    );

  if (force && isCurrentDirExists) {
    console.log(chalk.green(`[tskit] exists dir: '${fullpath}'`));
    await fs.promises.rm(dir, { recursive: true, force: true });
    console.log(chalk.green(`[tskit] removed dir: '${fullpath}'`));
  }

  await copy(getTplDir(template), fullpath);
};

export default init;
