import { Result, compare } from "dir-compare";
import fsExtra from "fs-extra";
import path from "path";
import tempy from "tempy";

import { FrameworkKey, TemplateKey, Templates } from "../../src/helpers/constants";
import * as envHelpers from "../../src/helpers/env";
import { downloadAndExtractTemplateContext, hasTemplate } from "../../src/helpers/templates";

const templateTable = Templates.map(template => {
  return [template];
});

describe("templates", function () {
  let getRefsMock: any;

  beforeAll(function () {
    getRefsMock = jest.spyOn(envHelpers, "getRefs");
  });

  describe("downloadAndExtractTemplateContext", function () {
    let testDirPath: string;

    beforeEach(function () {
      testDirPath = tempy.directory();
    });

    describe("when the framework = react", function () {
      const framework: FrameworkKey = "react";

      describe.each(templateTable)("when the template = %s", function (template: TemplateKey) {
        const sourceCodePath: string = path.join(__dirname, "..", "..", "templates", framework, template);

        test("it works", async function () {
          try {
            await downloadAndExtractTemplateContext(testDirPath, framework, template);
          } catch (error) {
            console.log({ error });
          }
          const result: Result = await compare(sourceCodePath, testDirPath);
          expect(result.same).toBe(true);
        });
      });
    });

    describe("when the framework = vue", function () {
      const framework: FrameworkKey = "vue";

      describe.each(templateTable)("when the template = %s", function (template: TemplateKey) {
        const sourceCodePath: string = path.join(__dirname, "..", "..", "templates", framework, template);

        test("it works", async function () {
          try {
            await downloadAndExtractTemplateContext(testDirPath, framework, template);
          } catch (error) {
            console.log({ error });
          }
          const result: Result = await compare(sourceCodePath, testDirPath);
          expect(result.same).toBe(true);
        });
      });
    });

    afterEach(function () {
      fsExtra.removeSync(testDirPath);
    });
  });

  describe("hasTemplate", function () {
    describe("when the framework is not valid", function () {
      const framework: string = "angular";
      const template: string = "default";
      const ref: string = "develop";

      beforeEach(function () {
        getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref });
      });

      test("it returns false", async function () {
        const result: boolean = await hasTemplate(framework, template);
        expect(result).toBe(false);
      });
    });

    describe("when the framework is valid", function () {
      const framework: string = "react";

      describe("when the template is not valid", function () {
        const framework: string = "react";
        const template: string = "bitconnect";
        const ref: string = "develop";

        beforeEach(function () {
          getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref });
        });

        test("it returns false", async function () {
          const result: boolean = await hasTemplate(framework, template);
          expect(result).toBe(false);
        });
      });

      describe("when the template is valid", function () {
        const template: string = "default";

        describe("when the ref is not valid", function () {
          const ref: string = "invalid-ref";

          beforeEach(function () {
            getRefsMock.mockReturnValueOnce({ ref, tarGzRef: ref });
          });

          test("it returns false", async function () {
            const result: boolean = await hasTemplate(framework, template);
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
              const result: boolean = await hasTemplate(framework, template);
              expect(result).toBe(true);
            });
          });

          describe("when the ref is a semver", function () {
            const tarGzRef: string = "1.5.0";

            beforeEach(function () {
              getRefsMock.mockReturnValueOnce({ ref: "v" + tarGzRef, tarGzRef });
            });

            test("it returns true", async function () {
              const result: boolean = await hasTemplate(framework, template);
              expect(result).toBe(true);
            });
          });
        });
      });
    });
  });

  afterAll(function () {
    getRefsMock.mockRestore();
  });
});
