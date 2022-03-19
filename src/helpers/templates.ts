import fsExtra from "fs-extra";
import got from "got";
import Handlebars from "handlebars";
import path from "path";
import promisePipe from "promisepipe";
import tar from "tar";
import urlExists from "url-exist";

import {
  FrameworkKey,
  HandlebarsFiles,
  HardcodedTemplateFiles,
  TemplateKey,
  codeloadBaseUrl,
  githubApiBaseUrl,
} from "./constants";
import { getRefs, getRepository } from "./env";

export async function downloadAndExtractTemplateContext(
  root: string,
  framework: FrameworkKey,
  template: TemplateKey,
): Promise<void> {
  await fsExtra.ensureDir(root);
  const repository: string = getRepository();
  const { ref, tarGzRef } = getRefs();
  const downloadUrl: string = codeloadBaseUrl + "/" + repository + "/tar.gz/" + ref;
  return promisePipe(
    got.stream(downloadUrl),
    tar.extract({ cwd: root, strip: 4 }, [`create-eth-app-${tarGzRef}/templates/${framework}/${template}`]),
  );
}

export async function parseTemplate(
  appPath: string,
  templateContextPath: string,
  framework: FrameworkKey,
  template: TemplateKey,
): Promise<void> {
  for (const handlebarFile of HandlebarsFiles[framework]) {
    const contextFileName: string = handlebarFile + ".ctx";
    const contextFilePath: string = path.join(templateContextPath, contextFileName);
    const contextFileContents: string = await fsExtra.readFile(contextFilePath, "utf-8");
    const context: JSON = JSON.parse(contextFileContents);

    const hbsFileName: string = handlebarFile + ".hbs";
    const hbsFilePath: string = path.join(appPath, hbsFileName);
    const hnsFileContents: string = await fsExtra.readFile(hbsFilePath, "utf-8");

    const appFilePath: string = path.join(appPath, handlebarFile);
    const appFileContents: string = Handlebars.compile(hnsFileContents)(context);
    await fsExtra.writeFile(appFilePath, appFileContents);
    await fsExtra.remove(hbsFilePath);
  }

  for (const hardcodedTemplateFile of HardcodedTemplateFiles[framework][template]) {
    const contextFilePath: string = path.join(templateContextPath, hardcodedTemplateFile);
    const appFilePath: string = path.join(appPath, hardcodedTemplateFile);

    // Any standard file with the same name as a hardcoded file gets overridden.
    if (fsExtra.existsSync(appFilePath)) {
      await fsExtra.remove(appFilePath);
    }
    await fsExtra.move(contextFilePath, appFilePath);
  }

  // After all parsing is complete, prune the context of the current template.
  await fsExtra.remove(templateContextPath);
}

export function hasTemplate(framework: string, template: string): Promise<boolean> {
  const repository: string = getRepository();
  const { ref } = getRefs();
  const url: string = `${githubApiBaseUrl}/${repository}/contents/templates/${framework}/${encodeURIComponent(
    template,
  )}?ref=${ref}`;
  return urlExists(url);
}
