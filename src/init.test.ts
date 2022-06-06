/* eslint-disable */
import fs from "fs";
import init, { copy } from "./init";

const mockDir = (dir: string) => {
  fs.mkdirSync(dir);

  fs.openSync(`${dir}/index.ts`, fs.constants.O_CREAT | fs.constants.O_TRUNC);
  fs.writeFileSync(`${dir}/index.ts`, "console.log('index')", {
    encoding: "utf8",
  });

  fs.openSync(`${dir}/a.ts`, fs.constants.O_CREAT | fs.constants.O_TRUNC);
  fs.writeFileSync(`${dir}/a.ts`, "console.log('a')", { encoding: "utf8" });

  fs.openSync(`${dir}/b.ts`, fs.constants.O_CREAT | fs.constants.O_TRUNC);
  fs.writeFileSync(`${dir}/b.ts`, "console.log('b')", { encoding: "utf8" });
};
const rmMockDir = (dir: string) => {
  fs.existsSync(dir) && fs.rmSync(dir, { recursive: true });
};

describe("test 'copy'", () => {
  describe("'xxx' exists", () => {
    describe("'yyy' not exists", () => {
      beforeEach(() => {
        mockDir("xxx");
        rmMockDir("yyy");
      });

      afterEach(() => {
        rmMockDir("xxx");
        rmMockDir("yyy");
      });

      it("not throw error", () => {
        expect(() => copy("xxx", "yyy")).not.toThrow();
      });
    });

    describe("'yyy' exists", () => {
      beforeEach(() => {
        mockDir("xxx");
        mockDir("yyy");
      });

      afterEach(() => {
        rmMockDir("xxx");
        rmMockDir("yyy");
      });

      it("not throw error", () => {
        expect(() => copy("xxx", "yyy")).not.toThrow();
      });
    });
  });

  describe("'xxx' not exists", () => {
    describe("'yyy' not exists", () => {
      beforeEach(() => {
        rmMockDir("xxx");
        rmMockDir("yyy");
      });

      afterEach(() => {
        rmMockDir("xxx");
        rmMockDir("yyy");
      });

      it("not throw error", () => {
        expect(() => copy("xxx", "yyy")).toThrow();
      });
    });

    describe("'yyy' exists", () => {
      beforeEach(() => {
        rmMockDir("xxx");
        mockDir("yyy");
      });

      afterEach(() => {
        rmMockDir("xxx");
        rmMockDir("yyy");
      });

      it("not throw error", () => {
        expect(() => copy("xxx", "yyy")).toThrow();
      });
    });
  });
});

describe("test 'init'", () => {
  describe("'xxx' exists", () => {
    beforeEach(() => {
      mockDir("xxx");
    });

    afterEach(() => {
      rmMockDir("xxx");
    });

    it("init 'xxx' not force", () => {
      expect(() => init("xxx", "ts", false)).toThrow();
    });

    it("init 'xxx' force", () => {
      expect(() => init("xxx", "ts", true)).not.toThrow();
    });
  });

  describe("'xxx' not exists", () => {
    beforeEach(() => {
      rmMockDir("xxx");
    });

    afterEach(() => {
      rmMockDir("xxx");
    });

    it("init 'xxx' not force", () => {
      expect(() => init("xxx", "ts", false)).not.toThrow();
    });

    it("init 'xxx' force", () => {
      expect(() => init("xxx", "ts", true)).not.toThrow();
    });
  });
});
