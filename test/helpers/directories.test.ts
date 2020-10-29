import chalk from "chalk";
import fsExtra from "fs-extra";
import path from "path";
import rimraf from "rimraf";
import tempy from "tempy";

import { isDirectoryEmpty } from "../../src/helpers/directories";

describe.only("directories", function () {
  const appName: string = "my-eth-app";
  let directoryPath: string;

  beforeEach(function () {
    directoryPath = tempy.directory();
  });

  describe("when the directory is empty", function () {
    test("returns true", function () {
      expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
    });
  });

  describe("when the directory is not empty", function () {
    describe("when it contains a .DS_Store file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, ".DS_Store"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .git directory", function () {
      beforeEach(async function () {
        await fsExtra.mkdir(path.join(directoryPath, ".git"));
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .gitattributes file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, ".gitattributes"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .gitignore file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, ".gitignore"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .gitlab-ci.yml file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, ".gitlab-ci.yml"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .hg directory", function () {
      beforeEach(async function () {
        await fsExtra.mkdir(path.join(directoryPath, ".hg"));
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .hgcheck file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, ".hgcheck"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .hgignore file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, ".hgignore"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains an .idea folder", function () {
      beforeEach(async function () {
        await fsExtra.mkdir(path.join(directoryPath, ".idea"));
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a .travis.yml file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, ".travis.yml"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a LICENSE file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, "LICENSE"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a Thumbs.db file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, "Thumbs.db"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a docs directory", function () {
      beforeEach(async function () {
        await fsExtra.mkdir(path.join(directoryPath, "docs"));
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a mkdocs.yml file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, "mkdocs.yml"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a npm-debug.log file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, "npm-debug.log"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a yarn-debug.log file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, "yarn-debug.log"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains a yarn-error.log file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, "yarn-error.log"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains an proj.iml file", function () {
      beforeEach(async function () {
        await fsExtra.open(path.join(directoryPath, "proj.iml"), "w");
      });

      test("returns true", async function () {
        expect(isDirectoryEmpty(directoryPath, appName)).toBe(true);
      });
    });

    describe("when it contains no valid directories or files", function () {
      beforeEach(function () {
        console.log = jest.fn();
      });

      describe("when it contains a foo directory", function () {
        beforeEach(async function () {
          await fsExtra.mkdir(path.join(directoryPath, "foo"));
        });

        test("returns conflicts", async function () {
          const result: boolean = isDirectoryEmpty(directoryPath, appName);
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
          await fsExtra.open(path.join(directoryPath, "bar"), "w");
        });

        test("returns conflicts", async function () {
          const result: boolean = isDirectoryEmpty(directoryPath, appName);
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
    rimraf.sync(directoryPath);
  });
});
