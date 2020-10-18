import fs from "fs";
import got from "got";
import makeDir from "make-dir";
import promisePipe from "promisepipe";
import tar from "tar";

import packageJson from "../../package.json";
import { isUrlOk } from "./networking";

const ceaEnv: string = process.env.CEA_ENV || "";
const githubApiBaseUrl: string = "https://codeload.github.com/" + packageJson.repository.name + "/tar.gz/";

/* https://gist.github.com/jhorsman/62eeea161a13b80e39f5249281e17c39 */
const semanticVersionRegex: RegExp = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

/**
 * If the program is run in development mode, we source the templates from
 * a development ref. In production, we use the current version of the
 * package prepended by the letter "v".
 */
let ref: string = "";
let tarGzRef: string = "";

if (ceaEnv === "development") {
  let githubRef: string = "";
  if (process.env.GITHUB_REF) {
    githubRef = process.env.GITHUB_REF;
  } else if (process.env.CEA_GITHUB_REF) {
    githubRef = process.env.CEA_GITHUB_REF;
  } else {
    console.log("Please set either a GITHUB_REF or a CEA_GITHUB_REF environment variable.");
    process.exit(1);
  }

  if (new RegExp("^v" + semanticVersionRegex.source).test(githubRef)) {
    /* This is a version tag, like "v1.4.1" */
    ref = githubRef;
    tarGzRef = githubRef.slice(1);
  } else {
    /* This is a branch name, like "develop". */
    ref = githubRef;
    tarGzRef = githubRef;
  }
} else {
  /* This is a version tag, like "v1.4.1" */
  ref = "v" + packageJson.version;
  tarGzRef = packageJson.version;
}

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
