import fsExtra from "fs-extra";
import got from "got";
import promisePipe from "promisepipe";
import tar from "tar";
import urlExists from "url-exist";

import { codeloadBaseUrl, githubApiBaseUrl } from "./constants";
import { getRefs, getRepository } from "./env";

export async function downloadAndExtractFrameworkHandlebars(root: string, framework: string): Promise<void> {
  await fsExtra.ensureDir(root);
  const repository: string = getRepository();
  const { ref, tarGzRef } = getRefs();
  const downloadUrl: string = codeloadBaseUrl + "/" + repository + "/tar.gz/" + ref;
  return promisePipe(
    got.stream(downloadUrl),
    tar.extract({ cwd: root, strip: 3 }, [`create-eth-app-${tarGzRef}/handlebars/${framework}`]),
  );
}

export function hasFramework(framework: string): Promise<boolean> {
  const repository: string = getRepository();
  const { ref } = getRefs();
  const url: string = `${githubApiBaseUrl}/${repository}/contents/templates/${encodeURIComponent(
    framework,
  )}?ref=${ref}`;
  return urlExists(url);
}

export function hasFrameworkHandlebars(framework: string): Promise<boolean> {
  const repository: string = getRepository();
  const { ref } = getRefs();
  const url: string = `${githubApiBaseUrl}/${repository}/contents/handlebars/${encodeURIComponent(
    framework,
  )}?ref=${ref}`;
  return urlExists(url);
}
