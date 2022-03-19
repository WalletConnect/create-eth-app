import chalk from "chalk";
import fsExtra from "fs-extra";
import path from "path";
import tempy from "tempy";

import { isDirectoryEmpty } from "../../src/helpers/directories";

// This has to be in sync with the valid files defined "helpers/directories".
const filesDirsTable: string[][] = [
  [".DS_Store", "file"],
  [".git", "directory"],
  [".gitattributes", "file"],
  [".gitignore", "file"],
  [".gitlab-ci.yml", "file"],
  [".hg", "directory"],
  [".hgcheck", "file"],
  [".hgignore", "file"],
  [".idea", "directory"],
  ["Thumbs.db", "file"],
  [".travis.yml", "file"],
  ["docs", "directory"],
  ["LICENSE", "file"],
  ["mkdocs.yml", "file"],
  ["npm-debug.log", "file"],
  ["yarn-debug.log", "file"],
  ["yarn-error.log", "file"],
  ["proj.iml", "file"],
];

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
    describe.each(filesDirsTable)('when it contains a "%s" %s', function (name: string, type: string) {
      beforeEach(async function () {
        if (type === "file") {
          await fsExtra.open(path.join(testDirPath, name), "w");
        } else if (type === "directory") {
          await fsExtra.mkdir(path.join(testDirPath, name));
        }
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
    fsExtra.removeSync(testDirPath);
  });
});
