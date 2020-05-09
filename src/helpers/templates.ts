import got from "got";
import packageJson from "../../package.json";
import promisePipe from "promisepipe";
import tar from "tar";

import { isUrlOk } from "./networking";

export function downloadAndExtractTemplate(root: string, framework: string, name: string): Promise<void> {
  return promisePipe(
    got.stream(`https://codeload.github.com/${packageJson.repository.name}/tar.gz/develop`),
    tar.extract({ cwd: root, strip: 4 }, [`create-eth-app-develop/templates/${framework}/${name}`]),
  );
}

export function hasTemplate(framework: string, name: string): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/${packageJson.repository.name}/contents/templates/${framework}/${encodeURIComponent(
      name,
    )}/package.json?ref=develop`,
  );
}
