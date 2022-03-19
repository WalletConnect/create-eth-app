import { Result, compare } from "dir-compare";
import fsExtra from "fs-extra";
import path from "path";
import tempy from "tempy";

import * as envHelpers from "../../src/helpers/env";
import {
  downloadAndExtractFrameworkHandlebars,
  hasFramework,
  hasFrameworkHandlebars,
} from "../../src/helpers/frameworks";

describe("frameworks", function () {
  let getRefsMock: any;

  beforeAll(function () {
    getRefsMock = jest.spyOn(envHelpers, "getRefs");
  });

  describe("downloadAndExtractFrameworkHandlebars", function () {
    let testDirPath: string;

    beforeEach(async function () {
      testDirPath = tempy.directory();
    });

    describe("when the framework = react", function () {
      const framework: string = "react";
      const sourceCodePath: string = path.join(__dirname, "..", "..", "handlebars", framework);

      test("it works", async function () {
        await downloadAndExtractFrameworkHandlebars(testDirPath, framework);
        const result: Result = await compare(sourceCodePath, testDirPath);
        expect(result.same).toBe(true);
      });
    });

    describe("when the framework = vue", function () {
      const framework: string = "vue";
      const sourceCodePath: string = path.join(__dirname, "..", "..", "handlebars", framework);

      test("it works", async function () {
        await downloadAndExtractFrameworkHandlebars(testDirPath, framework);
        const result: Result = await compare(sourceCodePath, testDirPath);
        expect(result.same).toBe(true);
      });
    });

    afterEach(function () {
      fsExtra.removeSync(testDirPath);
    });
  });

  describe("hasFramework", function () {
    describe("when the framework is not valid", function () {
      const framework: string = "angular";
      const ref: string = "develop";

      beforeEach(function () {
        getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref });
      });

      test("it returns false", async function () {
        const result: boolean = await hasFramework(framework);
        expect(result).toBe(false);
      });
    });

    describe("when the framework is valid", function () {
      const framework: string = "react";

      describe("when the ref is not valid", function () {
        const ref: string = "invalid-ref";

        beforeEach(function () {
          getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref });
        });

        test("it returns false", async function () {
          const result: boolean = await hasFramework(framework);
          expect(result).toBe(false);
        });
      });

      describe("when the ref is valid", function () {
        describe("when the ref is a branch", function () {
          const ref: string = "develop";

          beforeEach(function () {
            getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref });
          });

          test("it returns true", async function () {
            const result: boolean = await hasFramework(framework);
            expect(result).toBe(true);
          });
        });

        describe("when the ref is a semver", function () {
          const ref: string = "v1.5.0";

          beforeEach(function () {
            getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref.slice(1) });
          });

          test("it returns true", async function () {
            const result: boolean = await hasFramework(framework);
            expect(result).toBe(true);
          });
        });
      });
    });
  });

  describe("hasFrameworkHandlebars", function () {
    describe("when the framework is not valid", function () {
      const framework: string = "angular";
      const ref: string = "develop";

      beforeEach(function () {
        getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref });
      });

      test("it returns false", async function () {
        const result: boolean = await hasFrameworkHandlebars(framework);
        expect(result).toBe(false);
      });
    });

    describe("when the framework is valid", function () {
      const framework: string = "react";

      describe("when the ref is not valid", function () {
        const ref: string = "invalid-ref";

        beforeEach(function () {
          getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref });
        });

        test("it returns false", async function () {
          const result: boolean = await hasFrameworkHandlebars(framework);
          expect(result).toBe(false);
        });
      });

      describe("when the ref is valid", function () {
        describe("when the ref is a branch", function () {
          const ref: string = "develop";

          beforeEach(function () {
            getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref });
          });

          test("it returns true", async function () {
            const result: boolean = await hasFrameworkHandlebars(framework);
            expect(result).toBe(true);
          });
        });

        describe("when the ref is a semver", function () {
          const tarGzRef: string = "1.5.0";

          beforeEach(function () {
            getRefsMock.mockReturnValueOnce({ ref: "v" + tarGzRef, tarGzRef: tarGzRef });
          });

          test("it returns true", async function () {
            const result: boolean = await hasFrameworkHandlebars(framework);
            expect(result).toBe(true);
          });
        });
      });
    });
  });

  afterAll(function () {
    getRefsMock.mockRestore();
  });
});
