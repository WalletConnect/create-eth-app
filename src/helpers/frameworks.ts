import got from "got";
import promisePipe from "promisepipe";
import tar from "tar";

import packageJson from "../../package.json";

import { frameworks } from "./constants";
import { isUrlOk } from "./networking";

export type FrameworkKey = typeof frameworks[number];

export function downloadAndExtractFrameworkHandlebars(root: string, framework: string): Promise<void> {
  return promisePipe(
    got.stream(`https://codeload.github.com/${packageJson.repository.name}/tar.gz/${packageJson.version}`),
    tar.extract({ cwd: root, strip: 3 }, [`create-eth-app-${packageJson.version}/handlebars/${framework}`]),
  );
}

export function hasFramework(name: string): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/${packageJson.repository.name}/contents/templates/${encodeURIComponent(
      name,
    )}?ref=${packageJson.version}`,
  );
}

export function hasFrameworkHandlebars(name: string): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/${packageJson.repository.name}/contents/handlebars/${encodeURIComponent(
      name,
    )}?ref=${packageJson.version}`,
  );
}
