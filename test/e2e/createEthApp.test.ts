import fsExtra from "fs-extra";
import execa, { ExecaChildProcess } from "execa";
import tempy from "tempy";
import waitForLocalhost from "wait-for-localhost";

import { FrameworkKey, TemplateKey } from "../../src/helpers/constants";
import { createEthApp } from "../../src/createEthApp";

describe("createEthApp", function () {
  let testDirPath: string;

  beforeEach(function () {
    console.log = jest.fn();
    testDirPath = tempy.directory();
  });

  describe("when the framework = react", function () {
    const framework: FrameworkKey = "react";

    describe("when the template is aave", function () {
      const template: TemplateKey = "aave";

      test("it works", async function () {
        await createEthApp({ appPath: testDirPath, framework, template });
        process.chdir(testDirPath);
        const options: execa.Options = {
          env: {
            CI: "false",
            PORT: "3000",
          },
        };
        const startProcess: ExecaChildProcess = execa("yarnpkg", ["react-app:start"], options);
        await waitForLocalhost({ port: 3000 });
        startProcess.kill("SIGKILL");
      });
    });
  });

  afterEach(function () {
    fsExtra.removeSync(testDirPath);
  });
});
