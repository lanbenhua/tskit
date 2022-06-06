/* eslint-disable */
import { isExists, isDirectory, isFile } from "./utils";

describe("test 'isExists'", () => {
  it("exists './src/utils.ts' file", () => {
    expect(isExists("./src/utils.ts")).toEqual(true);
  });
  it("exists './templates' directory", () => {
    expect(isExists("./templates")).toEqual(true);
  });

  it("not exists './src/utils2.ts' file", () => {
    expect(isExists(".src//utils2.ts")).toEqual(false);
  });
  it("not exists './templates2' directory", () => {
    expect(isExists("./templates2")).toEqual(false);
  });
});

describe("test 'isDirectory'", () => {
  it("'./src' is directory ", () => {
    expect(isDirectory("./src")).toEqual(true);
  });
  it("'./templates' is directory", () => {
    expect(isDirectory("./templates")).toEqual(true);
  });

  it("'./src/utils.ts' is not directory", () => {
    expect(isDirectory("./src/utils.ts")).toEqual(false);
  });
  it("'./src/index.ts' is not directory", () => {
    expect(isDirectory("./src/index.ts")).toEqual(false);
  });
  it("'./src/index2.ts' is not directory", () => {
    expect(isDirectory("./src/index2.ts")).toEqual(false);
  });
});

describe("test 'isFile'", () => {
  it("'./src/utils.ts' is file", () => {
    expect(isFile("./src/utils.ts")).toEqual(true);
  });
  it("'./src/index.ts' is file", () => {
    expect(isFile("./src/index.ts")).toEqual(true);
  });

  it("'./src' is not file", () => {
    expect(isFile("./src")).toEqual(false);
  });
  it("'./templates' is not file", () => {
    expect(isFile("./templates")).toEqual(false);
  });
  it("'./templates2' is not file", () => {
    expect(isFile("./templates2")).toEqual(false);
  });
});
