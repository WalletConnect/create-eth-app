import chalk from "chalk";
import fsExtra from "fs-extra";
import path from "path";
import rimraf from "rimraf";
import tempy from "tempy";

import { isDirectoryEmpty } from "../../src/helpers/directories";

describe("directories", function () {
  const appName: string = "my-eth-app";
  let testDirPath: string;

  beforeEach(function () {
    testDirPath = tempy.directory();
  });

  describe("when the directory is empty", function () {
    test("returns true", function () {
      expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
    });
  });

  describe("when the directory is not empty", function () {
    describe("when it contains a .DS_Store file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, ".DS_Store"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .git directory", function () {
      beforeEach(async function () {
        await fsExtra.mkdir(path.join(testDirPath, ".git"));
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .gitattributes file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, ".gitattributes"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .gitignore file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, ".gitignore"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .gitlab-ci.yml file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, ".gitlab-ci.yml"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .hg directory", function () {
      beforeEach(async function () {
        await fsExtra.mkdir(path.join(testDirPath, ".hg"));
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .hgcheck file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, ".hgcheck"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .hgignore file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, ".hgignore"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains an .idea folder", function () {
      beforeEach(async function () {
        await fsExtra.mkdir(path.join(testDirPath, ".idea"));
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .travis.yml file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, ".travis.yml"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a LICENSE file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, "LICENSE"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a Thumbs.db file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, "Thumbs.db"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a docs directory", function () {
      beforeEach(async function () {
        await fsExtra.mkdir(path.join(testDirPath, "docs"));
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a mkdocs.yml file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, "mkdocs.yml"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a npm-debug.log file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, "npm-debug.log"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a yarn-debug.log file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, "yarn-debug.log"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains a yarn-error.log file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, "yarn-error.log"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains an proj.iml file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(testDirPath, "proj.iml"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(testDirPath, appName)).toBe(true);
      });
    });

    describe("when it contains no valid directories or files", function () {
      beforeEach(function () {
        console.log = jest.fn();
      });

      describe("when it contains a foo directory", function () {
        beforeEach(async function () {
          await fsExtra.mkdir(path.join(testDirPath, "foo"));
        });

        test("returns conflicts", async function () {
          const result: boolean = isDirectoryEmpty(testDirPath, appName);
          expect(console.log).toHaveBeenCalledWith(
            "The directory " + chalk.green(appName) + " contains files that could conflict:",
          );
          expect(console.log).toHaveBeenCalledWith();
          expect(console.log).toHaveBeenCalledWith(`  ${chalk.blue("foo")}/`);
          expect(console.log).toHaveBeenCalledWith();
          expect(console.log).toHaveBeenCalledWith(
            "Either try using a new directory name, or remove the files listed above.",
          );
          expect(console.log).toHaveBeenCalledWith();
          expect(result).toBe(false);
        });
      });

      describe("when it contains a bar file", function () {
        beforeEach(async function () {
          await fsExtra.open(path.join(testDirPath, "bar"), "w");
        });

        test("returns conflicts", async function () {
          const result: boolean = isDirectoryEmpty(testDirPath, appName);
          expect(console.log).toHaveBeenCalledWith(
            "The directory " + chalk.green(appName) + " contains files that could conflict:",
          );
          expect(console.log).toHaveBeenCalledWith();
          expect(console.log).toHaveBeenCalledWith("  bar");
          expect(console.log).toHaveBeenCalledWith();
          expect(console.log).toHaveBeenCalledWith(
            "Either try using a new directory name, or remove the files listed above.",
          );
          expect(console.log).toHaveBeenCalledWith();
          expect(result).toBe(false);
        });
      });
    });
  });

  afterEach(function () {
    rimraf.sync(testDirPath);
  });
});
