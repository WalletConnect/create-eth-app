import Handlebars from "handlebars";
import fs from "fs-extra";
import path from "path";

import { HandlebarsFiles, HardcodedTemplateFiles, FrameworkKey, TemplateKey } from "./constants";
import { downloadAndExtractTemplate } from "./github";

export async function downloadAndParseTemplate(
  appPath: string,
  framework: FrameworkKey,
  template: TemplateKey,
): Promise<void> {
  /* Download the context of the template. */
  const templateContextPath: string = path.join(appPath, "context");
  await downloadAndExtractTemplate(templateContextPath, framework, template);

  for (const standardFile of HandlebarsFiles[framework]) {
    const contextFileName: string = standardFile + ".ctx";
    const contextFilePath: string = path.join(templateContextPath, contextFileName);
    const context: JSON = JSON.parse(await fs.readFile(contextFilePath, "utf-8"));

    const hbsFileName: string = standardFile + ".hbs";
    const hbsFilePath: string = path.join(appPath, hbsFileName);
    const hbs: string = await fs.readFile(hbsFilePath, "utf-8");
    const contents: string = Handlebars.compile(hbs)(context);

    const appFilePath: string = path.join(appPath, standardFile);
    await fs.writeFile(appFilePath, contents);
    await fs.remove(hbsFilePath);
  }

  for (const hardcodedFile of HardcodedTemplateFiles[framework][template]) {
    const contextFilePath: string = path.join(templateContextPath, hardcodedFile);
    const appFilePath: string = path.join(appPath, hardcodedFile);

    /* Any standard file with the same name as a hardcoded file gets overridden. */
    if (fs.existsSync(appFilePath)) {
      await fs.remove(appFilePath);
    }
    await fs.move(contextFilePath, appFilePath);
  }

  /* After all parsing is complete, prune the context of the current template. */
  await fs.remove(templateContextPath);
}

export function registerHandlebarsHelpers(): void {
  Handlebars.registerHelper("raw-helper", function (options) {
    return options.fn();
  });
}
