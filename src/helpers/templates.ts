import Handlebars from "handlebars";
import fs from "fs-extra";
import got from "got";
import makeDir from "make-dir";
import path from "path";
import promisePipe from "promisepipe";
import tar from "tar";

import packageJson from "../../package.json";

import { FrameworkKey } from "./frameworks";
import { isUrlOk } from "./networking";
import { templates } from "./constants";

export type TemplateKey = typeof templates[number];

export const standardFiles: Record<FrameworkKey, string[]> = {
  react: [
    "package.json",
    "README.md",
    "packages/contracts/package.json",
    "packages/contracts/README.md",
    "packages/contracts/src/index.js",
    "packages/react-app/package.json",
    "packages/react-app/README.md",
    "packages/react-app/src/index.js",
    "packages/react-app/src/App.js",
  ],
  vue: [
    "package.json",
    "README.md",
    "packages/contracts/package.json",
    "packages/contracts/README.md",
    "packages/contracts/src/index.js",
    "packages/vue-app/package.json",
    "packages/vue-app/README.md",
    "packages/vue-app/src/main.js",
    "packages/vue-app/src/components/HelloWorld.vue",
  ],
};

/* Files that are found in all templates. */
const commonFiles: string[] = [
  "packages/contracts/src/abis.js",
  "packages/contracts/src/addresses.js",
  "packages/contracts/src/abis",
];

/* Files that are unique to the React templates. */
const reactBespokeFiles: string[] = [...commonFiles, "packages/react-app/src/graphql/subgraph.js"];

/* Files that are unique to the Vue templates. */
const vueBespokeFiles: string[] = [...commonFiles, "packages/vue-app/src/graphql/subgraph.js"];

/* Files that are unique for each individual template. */
const bespokeFiles: Record<FrameworkKey, Record<TemplateKey, string[]>> = {
  react: {
    aave: reactBespokeFiles,
    compound: reactBespokeFiles,
    default: [...reactBespokeFiles, ".gitignore", "README.md", "packages/subgraph"],
    kyber: reactBespokeFiles,
    maker: reactBespokeFiles,
    "sablier-v1": reactBespokeFiles,
    synthetix: reactBespokeFiles,
    "uniswap-v1": reactBespokeFiles,
    "uniswap-v2": reactBespokeFiles,
  },
  vue: {
    aave: vueBespokeFiles,
    compound: vueBespokeFiles,
    default: [...vueBespokeFiles, ".gitignore", "README.md", "packages/subgraph"],
    kyber: vueBespokeFiles,
    maker: vueBespokeFiles,
    "sablier-v1": vueBespokeFiles,
    synthetix: vueBespokeFiles,
    "uniswap-v1": vueBespokeFiles,
    "uniswap-v2": vueBespokeFiles,
  },
};

export function downloadAndExtractTemplate(root: string, framework: string, name: string): Promise<void> {
  return promisePipe(
    got.stream(`https://codeload.github.com/${packageJson.repository.name}/tar.gz/${packageJson.version}`),
    tar.extract({ cwd: root, strip: 4 }, [`create-eth-app-${packageJson.version}/templates/${framework}/${name}`]),
  );
}

export function hasTemplate(framework: string, name: string): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/${packageJson.repository.name}/contents/templates/${framework}/${encodeURIComponent(
      name,
    )}?ref=${packageJson.version}`,
  );
}

export async function parseTemplate(appPath: string, framework: FrameworkKey, template: TemplateKey): Promise<void> {
  /* Download the context of the template. */
  const templateContextPath: string = path.join(appPath, "context");
  await makeDir(templateContextPath);
  await downloadAndExtractTemplate(templateContextPath, framework, template);

  for (const standardFile of standardFiles[framework]) {
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

  for (const bespokeFile of bespokeFiles[framework][template]) {
    const contextFilePath: string = path.join(templateContextPath, bespokeFile);
    const appFilePath: string = path.join(appPath, bespokeFile);

    /* Any standard file with the same name as a bespoke file gets overridden. */
    if (fs.existsSync(appFilePath)) {
      await fs.remove(appFilePath);
    }
    await fs.move(contextFilePath, appFilePath);
  }

  /* After all parsing is complete, prune the context of the current template. */
  await fs.remove(templateContextPath);
}

export function registerHandlebarsHelpers(): void {
  Handlebars.registerHelper("raw-helper", options => {
    return options.fn();
  });
}
