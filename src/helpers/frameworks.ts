import { execSync } from "child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "fs";
import got from "got";
import promisePipe from "promisepipe";
import { extract } from "tar";

export const availableFrameworks = ["react", "vue"];

export function hasFramework(framework: string): boolean {
  return !!availableFrameworks.find(availableFramework => { return framework === availableFramework });
}

export function installFramework(root: string, framework: string, appName: string) {
  let scripts = {};
  
  mkdirSync(`${root}/packages`, { recursive: true });

  switch(framework) {
    case "react":
      copyFileSync(`${__dirname}/assets/react.README.md`, `${root}/README.md`);
      execSync(`npx create-react-app react-app`, { cwd: `${root}/packages`, stdio: "inherit" });
      scripts = {
        "react-app:build": `yarn workspace @${appName}/react-app build`,
        "react-app:eject": `yarn workspace @${appName}/react-app eject`,
        "react-app:start": `yarn workspace @${appName}/react-app start`,
        "react-app:test": `yarn workspace @${appName}/react-app test`
      };
      break;
    case "vue":
      copyFileSync(`${__dirname}/assets/vue.README.md`, `${root}/README.md`);
      execSync(`npx vue create vue-app`, { cwd: `${root}/packages`, stdio: "inherit" });
      scripts = {
        "vue-app:build": `yarn workspace @${appName}/vue-app build`,
        "vue-app:lint": `yarn workspace @${appName}/vue-app lint`,
        "vue-app:serve": `yarn workspace @${appName}/vue-app serve`
      };
      break;
  }

  const repoPackageJsonPath = `${root}/package.json`;
  const repoPackageJson = require(`${__dirname}/assets/default.package.json`);
  repoPackageJson.name = `@${appName}/monorepo`;
  repoPackageJson.scripts = scripts;
  writeFileSync(repoPackageJsonPath, JSON.stringify(repoPackageJson, null, 2));

  const appPackageJsonPath = `${root}/packages/${framework}-app/package.json`;
  const appPackageJson = require(appPackageJsonPath);
  appPackageJson.name = `@${appName}/${framework}-app`;
  writeFileSync(appPackageJsonPath, JSON.stringify(appPackageJson, null, 2));
}

export async function downloadAndExtractFrameworkComponents(root: string, framework: string, template: string): Promise<void> {
  return await promisePipe(
    got.stream("https://codeload.github.com/proofoftom/create-eth-app/tar.gz/feature/multi-framework"),
    extract({ cwd: `${root}/packages/${framework}-app/src/components`, strip: 4 }, [`create-eth-app-feature-multi-framework/templates/${template}/components/${framework}`]),
  );
}
