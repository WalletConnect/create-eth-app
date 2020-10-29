import child_process from "child_process";
import rimraf from "rimraf";
import tempy from "tempy";
import { when } from "jest-when";

import { isInGitRepository, isInMercurialRepository, tryGitInit } from "../../src/helpers/git";

describe("git", function () {
  let directoryPath: string;
  let mockExecSync: jest.SpyInstance;

  beforeAll(function () {
    mockExecSync = jest.spyOn(child_process, "execSync");
  });

  beforeEach(function () {
    directoryPath = tempy.directory();
  });

  describe("isInGitRepository", function () {
    describe("when the rev-parse command fails", function () {
      beforeEach(function () {
        when(mockExecSync)
          .calledWith("git rev-parse --is-inside-work-tree", { stdio: "ignore" })
          .mockImplementationOnce(function () {
            throw new Error();
          });
      });

      test("it returns false", function () {
        expect(isInGitRepository()).toBe(false);
      });
    });

    describe("when the rev-parse command executes successfully", function () {
      beforeEach(function () {
        when(mockExecSync)
          .calledWith("git rev-parse --is-inside-work-tree", { stdio: "ignore" })
          .mockReturnValueOnce(true);
      });

      test("it returns true", function () {
        expect(isInGitRepository()).toBe(true);
      });
    });
  });

  describe("isInMercurialRepository", function () {
    describe("when the hg command fails", function () {
      beforeEach(function () {
        when(mockExecSync)
          .calledWith("hg --cwd . root", { stdio: "ignore" })
          .mockImplementationOnce(function () {
            throw new Error();
          });
      });

      test("it returns false", function () {
        expect(isInMercurialRepository()).toBe(false);
      });
    });

    describe("when the hg command executes successfully", function () {
      beforeEach(function () {
        when(mockExecSync).calledWith("hg --cwd . root", { stdio: "ignore" }).mockReturnValueOnce(true);
      });

      test("it returns true", function () {
        expect(isInMercurialRepository()).toBe(true);
      });
    });
  });

  describe("tryGitInit", function () {
    describe("when the git --version command fails", function () {
      beforeEach(function () {
        when(mockExecSync)
          .calledWith("git --version", { stdio: "ignore" })
          .mockImplementationOnce(function () {
            throw new Error();
          });
      });

      test("it returns false", function () {
        expect(tryGitInit(directoryPath)).toBe(false);
      });
    });

    describe("when the git --version command executes successfully", function () {
      beforeEach(function () {
        when(mockExecSync).calledWith("git --version", { stdio: "ignore" }).mockReturnValueOnce(true);
      });

      describe("when git is already set up", function () {
        beforeEach(function () {
          when(mockExecSync)
            .calledWith("git rev-parse --is-inside-work-tree", { stdio: "ignore" })
            .mockReturnValueOnce(true);
        });

        test("it returns false", function () {
          expect(tryGitInit(directoryPath)).toBe(false);
        });
      });

      describe("when mercurial is already set up", function () {
        beforeEach(function () {
          when(mockExecSync)
            .calledWith("git rev-parse --is-inside-work-tree", { stdio: "ignore" })
            .mockImplementationOnce(function () {
              throw new Error();
            });
          when(mockExecSync).calledWith("hg --cwd . root", { stdio: "ignore" }).mockReturnValueOnce(true);
        });

        test("it returns false", function () {
          expect(tryGitInit(directoryPath)).toBe(false);
        });
      });

      describe("when neither git nor mercurial is set up", function () {
        beforeEach(function () {
          when(mockExecSync)
            .calledWith("git rev-parse --is-inside-work-tree", { stdio: "ignore" })
            .mockImplementationOnce(function () {
              throw new Error();
            });
          when(mockExecSync)
            .calledWith("hg --cwd . root", { stdio: "ignore" })
            .mockImplementationOnce(function () {
              throw new Error();
            });
        });

        describe("when the git init command fails", function () {
          beforeEach(function () {
            when(mockExecSync)
              .calledWith("git init", { stdio: "ignore" })
              .mockImplementationOnce(function () {
                throw new Error();
              });
          });

          test("returns false", function () {
            expect(tryGitInit(directoryPath)).toBe(false);
          });
        });

        describe("when the git init command executes successfully", function () {
          beforeEach(function () {
            when(mockExecSync).calledWith("git init", { stdio: "ignore" }).mockReturnValueOnce(true);
          });

          describe("when the git add -A command fails", function () {
            beforeEach(function () {
              when(mockExecSync)
                .calledWith("git add -A", { stdio: "ignore" })
                .mockImplementationOnce(function () {
                  throw new Error();
                });
            });

            test("returns false", function () {
              expect(tryGitInit(directoryPath)).toBe(false);
            });
          });

          describe("when the git add -A command executes successfully", function () {
            beforeEach(function () {
              when(mockExecSync).calledWith("git add -A", { stdio: "ignore" }).mockReturnValueOnce(true);
            });

            describe("when the git commit -m command fails", function () {
              beforeEach(function () {
                when(mockExecSync)
                  .calledWith('git commit -m "Initial commit from Create Eth App"', { stdio: "ignore" })
                  .mockImplementationOnce(function () {
                    throw new Error();
                  });
              });

              test("returns false", function () {
                expect(tryGitInit(directoryPath)).toBe(false);
              });
            });

            describe("when the git commit -m command executes successfully", function () {
              beforeEach(function () {
                when(mockExecSync)
                  .calledWith('git commit -m "Initial commit from Create Eth App"', { stdio: "ignore" })
                  .mockReturnValueOnce(true);
              });

              test("returns true", function () {
                expect(tryGitInit(directoryPath)).toBe(true);
              });
            });
          });
        });
      });
    });
  });

  afterAll(function () {
    mockExecSync.mockRestore();
  });

  afterEach(function () {
    rimraf.sync(directoryPath);
  });
});
