import fsExtra from "fs-extra";
import got from "got";
import promisePipe from "promisepipe";
import tar from "tar";

import packageJson from "../../package.json";
import { githubApiBaseUrl } from "./constants";
import { getRefs } from "./refs";
import { isUrlOk } from "./networking";

const { ref, tarGzRef } = getRefs();

export async function downloadAndExtractFrameworkHandlebars(root: string, framework: string): Promise<void> {
  if (!fsExtra.existsSync(root)) {
    await fsExtra.mkdir(root);
  }

  const downloadUrl: string = githubApiBaseUrl + ref;
  return promisePipe(
    got.stream(downloadUrl),
    tar.extract({ cwd: root, strip: 3 }, [`create-eth-app-${tarGzRef}/handlebars/${framework}`]),
  );
}

export function hasFramework(name: string): Promise<boolean> {
  const url: string = `https://api.github.com/repos/${
    packageJson.repository.name
  }/contents/templates/${encodeURIComponent(name)}?ref=${ref}`;
  return isUrlOk(url);
}

export function hasFrameworkHandlebars(name: string): Promise<boolean> {
  const url: string = `https://api.github.com/repos/${
    packageJson.repository.name
  }/contents/handlebars/${encodeURIComponent(name)}?ref=${ref}`;
  return isUrlOk(url);
}
