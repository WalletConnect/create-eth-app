import packageJson from "../../package.json";
import { getRefs } from "../../src/helpers/refs";

describe("refs", function () {
  const oldEnv = process.env;
  let mockProcessExit: jest.SpyInstance;

  beforeAll(function () {
    jest.resetModules(); /* Clears the process.env cache */
    process.env = { ...oldEnv };
    mockProcessExit = jest.spyOn(process, "exit").mockImplementation(function (code?: number) {
      return code as never;
    });
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

  describe("when CEA_ENV = production", function () {
    beforeEach(function () {
      process.env.CEA_ENV = "production";
    });

    test("it returns the package version", function () {
      const { ref, tarGzRef } = getRefs();
      expect(ref).toBe("v" + packageJson.version);
      expect(tarGzRef).toBe(packageJson.version);
    });
  });

  describe("when CEA_ENV = development", function () {
    beforeEach(function () {
      console.log = jest.fn();
      process.env.CEA_ENV = "development";
    });

    describe("when both GITHUB_REF and CEA_GITHUB_REF are undefined", function () {
      beforeEach(function () {
        process.env.GITHUB_REF = undefined;
        process.env.CEA_GITHUB_REF = undefined;
      });

      test("it exits the process", function () {
        getRefs();
        expect(console.log).toHaveBeenCalledWith(
          "Please set either a GITHUB_REF or a CEA_GITHUB_REF environment variable.",
        );
        expect(mockProcessExit).toHaveBeenCalledWith(1);
      });
    });

    describe("when GITHUB_REF = staging", function () {
      beforeEach(function () {
        process.env.GITHUB_REF = "staging";
        process.env.CEA_GITHUB_REF = undefined;
      });

      test("it returns staging", function () {
        const { ref, tarGzRef } = getRefs();
        expect(ref).toBe("staging");
        expect(tarGzRef).toBe("staging");
      });
    });

    describe("when GITHUB_REF = undefined", function () {
      beforeEach(function () {
        process.env.GITHUB_REF = undefined;
      });

      describe("when CEA_GITHUB_REF = v1.4.1", function () {
        beforeEach(function () {
          process.env.CEA_GITHUB_REF = "v1.4.1";
        });

        test("it returns v1.4.1", function () {
          const { ref, tarGzRef } = getRefs();
          expect(ref).toBe("v1.4.1");
          expect(tarGzRef).toBe("1.4.1");
        });
      });

      describe("when CEA_GITHUB_REF = develop", function () {
        beforeEach(function () {
          process.env.CEA_GITHUB_REF = "develop";
        });

        test("it returns develop", function () {
          const { ref, tarGzRef } = getRefs();
          expect(ref).toBe("develop");
          expect(tarGzRef).toBe("develop");
        });
      });
    });
  });

  afterAll(() => {
    mockProcessExit.mockRestore();
  });
});
