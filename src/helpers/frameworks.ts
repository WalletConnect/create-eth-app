import packageJson from "../../package.json";

import { isUrlOk } from "./networking";

export function hasFramework(name: string): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/${packageJson.repository.name}/contents/templates/${encodeURIComponent(name)}`,
  );
}
