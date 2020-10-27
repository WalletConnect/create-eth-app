import fs from "fs";
import got from "got";
import makeDir from "make-dir";
import promisePipe from "promisepipe";
import tar from "tar";

import packageJson from "../../package.json";
import { getRefs } from "./refs";
import { isUrlOk } from "./networking";

const githubApiBaseUrl: string = "https://codeload.github.com/" + packageJson.repository.name + "/tar.gz/";
const { ref, tarGzRef } = getRefs();

export function getRepoArchiveDownloadUrl(): string {
  return githubApiBaseUrl + ref;
}

export async function downloadAndExtractFrameworkHandlebars(root: string, framework: string): Promise<void> {
  if (!fs.existsSync(root)) {
    await makeDir(root);
  }

  const downloadUrl: string = getRepoArchiveDownloadUrl();
  return promisePipe(
    got.stream(downloadUrl),
    tar.extract({ cwd: root, strip: 3 }, [`create-eth-app-${tarGzRef}/handlebars/${framework}`]),
  );
}

export async function downloadAndExtractTemplate(root: string, framework: string, name: string): Promise<void> {
  if (!fs.existsSync(root)) {
    await makeDir(root);
  }

  const downloadUrl: string = getRepoArchiveDownloadUrl();
  return promisePipe(
    got.stream(downloadUrl),
    tar.extract({ cwd: root, strip: 4 }, [`create-eth-app-${tarGzRef}/templates/${framework}/${name}`]),
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

export function hasTemplate(framework: string, name: string): Promise<boolean> {
  const url: string = `https://api.github.com/repos/${
    packageJson.repository.name
  }/contents/templates/${framework}/${encodeURIComponent(name)}?ref=${ref}`;
  return isUrlOk(url);
}
