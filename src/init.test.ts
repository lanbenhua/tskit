/* eslint-disable */
import fs from "fs";
import path from "path";
import init, { copy } from "./init";

const mockTemplateDir = (dir: string) => {
  const tempdir = path.resolve(__dirname, "../templates", dir);
  fs.mkdirSync(tempdir, { mode: 0o777 });

  fs.openSync(
    `${tempdir}/index.ts`,
    fs.constants.O_RDWR | fs.constants.O_CREAT | fs.constants.O_TRUNC,
    0o777
  );
  fs.writeFileSync(`${tempdir}/index.ts`, "console.log('index')", {
    encoding: "utf8",
    mode: 0o777,
  });

  fs.openSync(
    `${tempdir}/a.ts`,
    fs.constants.O_RDWR | fs.constants.O_CREAT | fs.constants.O_TRUNC,
    0o777
  );
  fs.writeFileSync(`${tempdir}/a.ts`, "console.log('a')", {
    encoding: "utf8",
    mode: 0o777,
  });

  fs.openSync(
    `${tempdir}/b.ts`,
    fs.constants.O_RDWR | fs.constants.O_CREAT | fs.constants.O_TRUNC,
    0o777
  );
  fs.writeFileSync(`${tempdir}/b.ts`, "console.log('b')", {
    encoding: "utf8",
    mode: 0o777,
  });
};
const rmMockTemplateDir = (dir: string) => {
  const tdir = path.resolve(__dirname, "../templates", dir);
  fs.existsSync(tdir) && fs.rmSync(tdir, { recursive: true, force: true });
};
const mockDir = (dir: string) => {
  fs.mkdirSync(dir, { mode: 0o777 });

  fs.openSync(
    `${dir}/index.ts`,
    fs.constants.O_RDWR | fs.constants.O_CREAT | fs.constants.O_TRUNC,
    0o777
  );
  fs.writeFileSync(`${dir}/index.ts`, "console.log('index')", {
    encoding: "utf8",
    mode: 0o777,
  });

  fs.openSync(
    `${dir}/a.ts`,
    fs.constants.O_RDWR | fs.constants.O_CREAT | fs.constants.O_TRUNC,
    0o777
  );
  fs.writeFileSync(`${dir}/a.ts`, "console.log('a')", {
    encoding: "utf8",
    mode: 0o777,
  });

  fs.openSync(
    `${dir}/b.ts`,
    fs.constants.O_RDWR | fs.constants.O_CREAT | fs.constants.O_TRUNC,
    0o777
  );
  fs.writeFileSync(`${dir}/b.ts`, "console.log('b')", {
    encoding: "utf8",
    mode: 0o777,
  });
};
const rmMockDir = (dir: string) => {
  fs.existsSync(dir) && fs.rmSync(dir, { recursive: true, force: true });
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

      it("not throw error", async () => {
        expect.assertions(0);
        try {
          await copy("xxx", "yyy");
        } catch (err) {
          expect(err).toBeNull();
        }
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

      it("not throw error", async () => {
        expect.assertions(0);
        try {
          await copy("xxx", "yyy");
        } catch (err) {
          expect(err).toBeNull();
        }
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

      it("throw error", async () => {
        expect.assertions(1);
        try {
          await copy("xxx", "yyy");
        } catch (err) {
          expect(err).not.toBeNull();
        }
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

      it("throw error", async () => {
        expect.assertions(1);
        try {
          await copy("xxx", "yyy");
        } catch (err) {
          expect(err).not.toBeNull();
        }
      });
    });
  });
});

describe("test 'init'", () => {
  describe("'xxx' exists", () => {
    describe("'yyy' exists", () => {
      beforeEach(() => {
        rmMockTemplateDir("xxx");
        mockTemplateDir("xxx");
        rmMockDir("yyy");
        mockDir("yyy");
      });
      afterEach(() => {
        rmMockTemplateDir("xxx");
        rmMockDir("yyy");
      });

      it("not force throw error", async () => {
        expect.assertions(1);
        try {
          await init("yyy", "xxx", false);
        } catch (err) {
          expect(err).not.toBeNull();
        }
      });
      it("force not throw error", async () => {
        expect.assertions(0);
        try {
          await init("yyy", "xxx", true);
        } catch (err) {
          expect(err).toBeNull();
        }
      });
    });

    describe("'yyy' not exists", () => {
      beforeEach(() => {
        rmMockTemplateDir("xxx");
        mockTemplateDir("xxx");
        rmMockDir("yyy");
      });
      afterEach(() => {
        rmMockTemplateDir("xxx");
        rmMockDir("yyy");
      });

      it("not force not throw error", async () => {
        expect.assertions(0);
        try {
          await init("yyy", "xxx", false);
        } catch (err) {
          expect(err).not.toBeNull();
        }
      });
      it("force not throw error", async () => {
        expect.assertions(0);
        try {
          await init("yyy", "xxx", true);
        } catch (err) {
          expect(err).not.toBeNull();
        }
      });
    });
  });

  describe("'xxx' not exists", () => {
    describe("'yyy' exists", () => {
      beforeEach(() => {
        rmMockTemplateDir("xxx");
        rmMockDir("yyy");
        mockDir("yyy");
      });
      afterEach(() => {
        rmMockTemplateDir("xxx");
        rmMockDir("yyy");
      });

      it("not force throw error", async () => {
        expect.assertions(1);
        try {
          await init("yyy", "xxx", false);
        } catch (err) {
          expect(err).not.toBeNull();
        }
      });
      it("force throw error", async () => {
        expect.assertions(1);
        try {
          await init("yyy", "xxx", true);
        } catch (err) {
          expect(err).not.toBeNull();
        }
      });
    });

    describe("'yyy' not exists", () => {
      beforeEach(() => {
        rmMockTemplateDir("xxx");
        rmMockDir("yyy");
      });
      afterEach(() => {
        rmMockTemplateDir("xxx");
        rmMockDir("yyy");
      });

      it("not force throw error", async () => {
        expect.assertions(1);
        try {
          await init("yyy", "xxx", false);
        } catch (err) {
          expect(err).not.toBeNull();
        }
      });

      it("force throw error", async () => {
        expect.assertions(1);
        try {
          await init("yyy", "xxx", true);
        } catch (err) {
          expect(err).not.toBeNull();
        }
      });
    });
  });
});
