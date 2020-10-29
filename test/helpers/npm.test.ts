import { validatePkgName } from "../../src/helpers/npm";

describe("npm", function () {
  describe("when the package name is valid", function () {
    test("it works", function () {
      const validation: { problems?: string[]; valid: boolean } = validatePkgName("my-eth-app");
      expect(validation.problems).toEqual(undefined);
      expect(validation.valid).toBe(true);
    });
  });

  describe("when the package name is not valid", function () {
    describe("when there is an error", function () {
      test("it returns a problems arrays", function () {
        const validation: { problems?: string[]; valid: boolean } = validatePkgName("error-triggering-name");
        expect(validation.problems).toEqual(["Error"]);
        expect(validation.valid).toBe(false);
      });
    });

    describe("when there is a warning", function () {
      test("it returns a problems arrays", function () {
        const validation: { problems?: string[]; valid: boolean } = validatePkgName("warning-triggering-name");
        expect(validation.problems).toEqual(["Warning"]);
        expect(validation.valid).toBe(false);
      });
    });
  });
});
