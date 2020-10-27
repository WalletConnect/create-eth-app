import packageJson from "../../package.json";
import { getRefs } from "../../src/helpers/refs";

describe("refs", function () {
  const oldEnv = process.env;
  let mockProcessExit: jest.SpyInstance;

  beforeAll(function () {
    jest.resetModules();
    process.env = { ...oldEnv };
    mockProcessExit = jest.spyOn(process, "exit").mockImplementation(function (code?: number) {
      return code as never;
    });
  });

  describe("when CEA_ENV = undefined", function () {
    test("it returns the package version", function () {
      process.env.CEA_ENV = undefined;
      const { ref, tarGzRef } = getRefs();
      expect(ref).toBe("v" + packageJson.version);
      expect(tarGzRef).toBe(packageJson.version);
    });
  });

  describe("when CEA_ENV = production", function () {
    test("it returns the package version", function () {
      process.env.CEA_ENV = "production";
      const { ref, tarGzRef } = getRefs();
      expect(ref).toBe("v" + packageJson.version);
      expect(tarGzRef).toBe(packageJson.version);
    });
  });

  describe("when CEA_ENV = development", function () {
    describe("when both GITHUB_REF and CEA_GITHUB_REF are undefined", function () {
      test("it exits the process", function () {
        console.log = jest.fn();
        process.env.CEA_ENV = "development";
        process.env.GITHUB_REF = undefined;
        process.env.CEA_GITHUB_REF = undefined;
        getRefs();
        expect(mockProcessExit).toHaveBeenCalledWith(1);
      });
    });

    describe("when GITHUB_REF = staging", function () {
      test("it returns staging", function () {
        process.env.CEA_ENV = "development";
        process.env.GITHUB_REF = "staging";
        process.env.CEA_GITHUB_REF = undefined;
        const { ref, tarGzRef } = getRefs();
        expect(ref).toBe("staging");
        expect(tarGzRef).toBe("staging");
      });
    });

    describe("when CEA_GITHUB_REF = v1.4.1", function () {
      test("it returns v1.4.1", function () {
        process.env.CEA_ENV = "development";
        process.env.GITHUB_REF = undefined;
        process.env.CEA_GITHUB_REF = "v1.4.1";
        const { ref, tarGzRef } = getRefs();
        expect(ref).toBe("v1.4.1");
        expect(tarGzRef).toBe("1.4.1");
      });
    });

    describe("when CEA_GITHUB_REF = develop", function () {
      test("it returns develop", function () {
        process.env.CEA_ENV = "development";
        process.env.GITHUB_REF = undefined;
        process.env.CEA_GITHUB_REF = "develop";
        const { ref, tarGzRef } = getRefs();
        expect(ref).toBe("develop");
        expect(tarGzRef).toBe("develop");
      });
    });
  });

  afterAll(() => {
    process.env = oldEnv;
    mockProcessExit.mockRestore();
  });
});
