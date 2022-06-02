import fs from 'fs';

export const isExists = (pathname: string): boolean => {
  try {
    return fs.existsSync(pathname);
  } catch(err) {
    return false;
  }
}

export const isDirectory = (pathname: string): boolean => {
  try {
    const stat = fs.statSync(pathname);
    return !!stat.isDirectory();
  } catch(err) {
    return false;
  }
}

export const isFile = (pathname: string): boolean => {
  try {
    const stat = fs.statSync(pathname);
    return !!stat.isFile();
  } catch(err) {
    return false;
  }
}