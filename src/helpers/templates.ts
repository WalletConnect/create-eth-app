import fsExtra from "fs-extra";
import got from "got";
import path from "path";
import promisePipe from "promisepipe";
import tar from "tar";

import packageJson from "../../package.json";
import { HandlebarsFiles, HardcodedTemplateFiles, FrameworkKey, TemplateKey } from "./constants";
import { githubApiBaseUrl } from "./constants";
import { getRefs } from "./refs";
import { isUrlOk } from "./networking";

const { ref, tarGzRef } = getRefs();

export async function downloadAndExtractTemplate(root: string, framework: string, name: string): Promise<void> {
  if (!fsExtra.existsSync(root)) {
    await fsExtra.mkdir(root);
  }

  const downloadUrl: string = githubApiBaseUrl + ref;
  return promisePipe(
    got.stream(downloadUrl),
    tar.extract({ cwd: root, strip: 4 }, [`create-eth-app-${tarGzRef}/templates/${framework}/${name}`]),
  );
}

export async function downloadAndParseTemplate(
  appPath: string,
  framework: FrameworkKey,
  template: TemplateKey,
): Promise<void> {
  // Download the context of the template.
  const templateContextPath: string = path.join(appPath, "context");
  await downloadAndExtractTemplate(templateContextPath, framework, template);

  for (const standardFile of HandlebarsFiles[framework]) {
    const contextFileName: string = standardFile + ".ctx";
    const contextFilePath: string = path.join(templateContextPath, contextFileName);
    const context: JSON = JSON.parse(await fsExtra.readFile(contextFilePath, "utf-8"));

    const hbsFileName: string = standardFile + ".hbs";
    const hbsFilePath: string = path.join(appPath, hbsFileName);
    const hbs: string = await fsExtra.readFile(hbsFilePath, "utf-8");
    const contents: string = Handlebars.compile(hbs)(context);

    const appFilePath: string = path.join(appPath, standardFile);
    await fsExtra.writeFile(appFilePath, contents);
    await fsExtra.remove(hbsFilePath);
  }

  for (const hardcodedFile of HardcodedTemplateFiles[framework][template]) {
    const contextFilePath: string = path.join(templateContextPath, hardcodedFile);
    const appFilePath: string = path.join(appPath, hardcodedFile);

    // Any standard file with the same name as a hardcoded file gets overridden.
    if (fsExtra.existsSync(appFilePath)) {
      await fsExtra.remove(appFilePath);
    }
    await fsExtra.move(contextFilePath, appFilePath);
  }

  // After all parsing is complete, prune the context of the current template.
  await fsExtra.remove(templateContextPath);
}

export function hasTemplate(framework: string, name: string): Promise<boolean> {
  const url: string = `https://api.github.com/repos/${
    packageJson.repository.name
  }/contents/templates/${framework}/${encodeURIComponent(name)}?ref=${ref}`;
  return isUrlOk(url);
}
