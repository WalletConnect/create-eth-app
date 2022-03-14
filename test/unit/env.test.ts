import packageJson from "../../package.json";
import { getRefs, getRepository } from "../../src/helpers/env";

describe("env", function () {
  const oldEnv = process.env;
  let processExitMock: any;

  beforeAll(function () {
    // Clears the process.env cache.
    jest.resetModules();
    process.env = { ...oldEnv };

    console.log = jest.fn();
    processExitMock = jest.spyOn(process, "exit").mockImplementation(function (code?: number): never {
      return code as never;
    });
  });

  describe("getRefs", function () {
    describe("when CI = undefined", function () {
      beforeEach(function () {
        process.env.CI = undefined;
      });

      describe("when CEA_ENV = undefined", function () {
        beforeEach(function () {
          process.env.CEA_ENV = undefined;
        });

        test("it returns the package version", function () {
          const { ref, tarGzRef } = getRefs();
          expect(ref).toBe("v" + packageJson.version);
          expect(tarGzRef).toBe(packageJson.version);
        });
      });

      describe("when CEA_ENV = development", function () {
        beforeEach(function () {
          process.env.CEA_ENV = "development";
        });

        describe("when DEVELOPMENT_REF = undefined", function () {
          beforeEach(function () {
            process.env.GITHUB_REF = undefined;
            process.env.DEVELOPMENT_REF = undefined;
          });

          test("it exits the process", function () {
            getRefs();
            expect(console.log).toHaveBeenCalledWith("Please set a DEVELOPMENT_REF environment variable.");
            expect(processExitMock).toHaveBeenCalledWith(1);
          });
        });

        describe("when DEVELOPMENT_REF = v1.5.0", function () {
          beforeEach(function () {
            process.env.DEVELOPMENT_REF = "v1.5.0";
          });

          test("it returns v1.5.0", function () {
            const { ref, tarGzRef } = getRefs();
            expect(ref).toBe("v1.5.0");
            expect(tarGzRef).toBe("1.5.0");
          });
        });

        describe("when DEVELOPMENT_REF = staging", function () {
          beforeEach(function () {
            process.env.DEVELOPMENT_REF = "staging";
          });

          test("it returns staging", function () {
            const { ref, tarGzRef } = getRefs();
            expect(ref).toBe("staging");
            expect(tarGzRef).toBe("staging");
          });
        });
      });
    });

    describe("when CI = true", function () {
      beforeEach(function () {
        process.env.CI = "true";
      });

      describe("when GITHUB_REF = undefined", function () {
        beforeEach(function () {
          process.env.GITHUB_REF = undefined;
        });

        test("it exits the process", function () {
          getRefs();
          expect(console.log).toHaveBeenCalledWith("Please set a GITHUB_REF environment variable.");
          expect(processExitMock).toHaveBeenCalledWith(1);
        });

        describe("when GITHUB_REF = v1.5.0", function () {
          beforeEach(function () {
            process.env.GITHUB_REF = "v1.5.0";
          });

          test("it returns v1.5.0", function () {
            const { ref, tarGzRef } = getRefs();
            expect(ref).toBe("v1.5.0");
            expect(tarGzRef).toBe("1.5.0");
          });
        });

        describe("when GITHUB_REF = staging", function () {
          beforeEach(function () {
            process.env.GITHUB_REF = "staging";
          });

          test("it returns staging", function () {
            const { ref, tarGzRef } = getRefs();
            expect(ref).toBe("staging");
            expect(tarGzRef).toBe("staging");
          });
        });

        describe("when GITHUB_REF = refs/heads/staging", function () {
          beforeEach(function () {
            process.env.GITHUB_REF = "refs/heads/staging";
          });

          test("it returns staging and staging", function () {
            const { ref, tarGzRef } = getRefs();
            expect(ref).toBe("staging");
            expect(tarGzRef).toBe("staging");
          });
        });
      });
    });
  });

  describe("getRepository", function () {
    describe("when CI = undefined", function () {
      beforeEach(function () {
        process.env.CI = undefined;
      });

      test("it returns the package repository name", function () {
        const repository: string = getRepository();
        expect(repository).toBe(packageJson.repository.name);
      });
    });

    describe("when CI = true", function () {
      beforeEach(function () {
        process.env.CI = "true";
      });

      describe("when GITHUB_REPOSITORY = undefined", function () {
        beforeEach(function () {
          process.env.GITHUB_REPOSITORY = undefined;
        });

        test("it exits the process", function () {
          getRepository();
          expect(console.log).toHaveBeenCalledWith("Please set a GITHUB_REPOSITORY environment variable.");
          expect(processExitMock).toHaveBeenCalledWith(1);
        });
      });

      describe("when GITHUB_REPOSITORY = octocat/create-eth-app", function () {
        beforeEach(function () {
          process.env.GITHUB_REPOSITORY = "octocat/create-eth-app";
        });

        test("it returns octocat/create-eth-app", function () {
          const repository: string = getRepository();
          expect(repository).toBe("octocat/create-eth-app");
        });
      });
    });
  });

  afterAll(() => {
    processExitMock.mockRestore();
  });
});
