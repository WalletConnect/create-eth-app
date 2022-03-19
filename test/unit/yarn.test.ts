import chalk from "chalk";
import childProcess from "child_process";
import { when } from "jest-when";

import { shouldUseYarn, shouldUseYarnWorkspaces } from "../../src/helpers/yarn";

describe("yarn", function () {
  let execSyncMock: any;
  let processExitMock: any;

  beforeAll(function () {
    console.error = jest.fn();
    console.log = jest.fn();
    execSyncMock = jest.spyOn(childProcess, "execSync");
    processExitMock = jest.spyOn(process, "exit").mockImplementation(function (code?: number) {
      return code as never;
    });
  });

  describe("shouldUseYarn", function () {
    describe("when the child process does not throw an error", function () {
      beforeEach(function () {
        when(execSyncMock).calledWith("yarnpkg --version", { stdio: "ignore" }).mockReturnValueOnce(true);
      });

      test("it works", function () {
        shouldUseYarn();
      });
    });

    describe("when the child process throws an error", function () {
      beforeEach(function () {
        when(execSyncMock)
          .calledWith("yarnpkg --version", { stdio: "ignore" })
          .mockImplementationOnce(function () {
            throw new Error();
          });
      });

      test("it exits the process", function () {
        shouldUseYarn();
        expect(console.error).toHaveBeenCalledWith(
          "Yarn is necessary for Create Eth App. Install it by following the official documentation:",
        );
        expect(console.log).toHaveBeenCalledWith();
        expect(console.log).toHaveBeenCalledWith(chalk.cyan("  https://classic.yarnpkg.com/en/docs/install"));
        expect(processExitMock).toHaveBeenCalledWith(1);
      });
    });
  });

  describe("shouldUseYarnWorkspaces", function () {
    describe("when the yarn version starts with non-zero", function () {
      beforeEach(function () {
        when(execSyncMock).calledWith("yarnpkg --version", { encoding: "utf8" }).mockReturnValueOnce("1.22.10");
      });

      test("it works", function () {
        shouldUseYarnWorkspaces();
      });
    });

    describe("when the yarn version starts with zero", function () {
      beforeEach(function () {
        when(execSyncMock).calledWith("yarnpkg --version", { encoding: "utf8" }).mockReturnValueOnce("0.28.1");
      });

      describe("when the workspaces flag = true", function () {
        beforeEach(function () {
          when(execSyncMock)
            .calledWith("yarnpkg config get workspaces-experimental", { encoding: "utf8" })
            .mockReturnValueOnce("true");
        });

        test("it works", function () {
          shouldUseYarnWorkspaces();
        });
      });

      describe("when the workspaces flag = false", function () {
        beforeEach(function () {
          when(execSyncMock)
            .calledWith("yarnpkg config get workspaces-experimental", { encoding: "utf8" })
            .mockReturnValueOnce("false");
        });

        test("it exits the process", function () {
          shouldUseYarnWorkspaces();
          expect(console.error).toHaveBeenCalledWith(
            "The Yarn Workspaces feature is necessary for Create Eth App. Please enable it by running this command:",
          );
          expect(console.log).toHaveBeenCalledWith();
          expect(console.log).toHaveBeenCalledWith(chalk.cyan("  yarn config set workspaces-experimental true"));
          expect(processExitMock).toHaveBeenCalledWith(1);
        });
      });
    });
  });

  afterAll(() => {
    execSyncMock.mockRestore();
    processExitMock.mockRestore();
  });
});
