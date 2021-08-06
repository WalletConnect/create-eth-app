import os from "os";
import path from "path";

import chalk from "chalk";
import fsExtra from "fs-extra";
import Handlebars from "handlebars";

import { FrameworkKey, TemplateKey } from "./helpers/constants";
import { installDeps } from "./helpers/deps";
import { isSafeToCreateAppIn } from "./helpers/dirs";
import { consoleErrorFrameworkNotFound, consoleErrorTemplateNotFound } from "./helpers/errors";
import { downloadAndExtractFrameworkHandlebars, hasFramework, hasFrameworkHandlebars } from "./helpers/frameworks";
import { tryGitInit } from "./helpers/git";
import { downloadAndExtractTemplateContext, hasTemplate, parseTemplate } from "./helpers/templates";
import { getTemplateInstallPackage } from "./helpers/templates_v2";

export async function createEthApp(appPath: string, template?: string): Promise<void> {
  const root: string = path.resolve(appPath);
  const appName: string = path.basename(root);

  // Create the directory if it doesn't exists and check it is safe to create a new app there.
  await fsExtra.ensureDir(root);
  if (!isSafeToCreateAppIn(root, appName)) {
    process.exit(1);
  }

  console.log(`Creating a new Ethereum-powered app in ${chalk.green(root)}.`);
  console.log();

  // Create the package.json file.
  const packageJson = {
    name: appName,
    version: "1.0.0",
    private: true,
  };
  await fsExtra.writeFile(path.join(root, "package.json"), JSON.stringify(packageJson, null, 2) + os.EOL);

  const originalDirectory: string = process.cwd();
  process.chdir(root);

  if (template) {
    const templateToInstall: string = getTemplateInstallPackage(template);
  }

  return Promise.resolve();
}

/// ---------------------- ///

export async function createEthAppV1({
  appPath,
  framework,
  template,
}: {
  appPath: string;
  framework?: string;
  template?: string;
}): Promise<void> {
  if (framework) {
    const foundFramework: boolean = await hasFramework(framework);
    const foundFrameworkHandlebars: boolean = await hasFrameworkHandlebars(framework);

    if (!foundFramework || !foundFrameworkHandlebars) {
      consoleErrorFrameworkNotFound(framework);
    }
  } else {
    framework = "react";
  }

  if (template) {
    if (template === "sablier") {
      template = "sablier-v1";
    }
    if (template === "uniswap") {
      template = "uniswap-v2";
    }

    const found: boolean = await hasTemplate(framework, template);
    if (!found) {
      consoleErrorTemplateNotFound(template);
    }
  } else {
    template = "default";
  }

  const root: string = path.resolve(appPath);
  const appName: string = path.basename(root);

  await fsExtra.ensureDir(root);
  if (!isSafeToCreateAppIn(root, appName)) {
    process.exit(1);
  }

  const originalDirectory: string = process.cwd();
  process.chdir(root);

  console.log();
  console.log(
    `Creating a new Ethereum-powered ${framework.charAt(0).toUpperCase() + framework.slice(1)} app in ${chalk.green(
      root,
    )}.`,
  );
  console.log();

  if (template === "default") {
    console.log("Downloading template files. This might take a moment.");
  } else {
    console.log(`Downloading files for template ${chalk.cyan(template)}. This might take a moment.`);
  }
  console.log();

  Handlebars.registerHelper("raw-helper", function (options) {
    return options.fn();
  });
  await downloadAndExtractFrameworkHandlebars(root, framework);
  const templateContextPath: string = path.join(appPath, "context");
  await downloadAndExtractTemplateContext(templateContextPath, framework as FrameworkKey, template as TemplateKey);
  await parseTemplate(appPath, templateContextPath, framework as FrameworkKey, template as TemplateKey);

  // Copy the default `.gitignore` if the template does not provide one.
  const ignorePath = path.join(root, ".gitignore");
  if (!fsExtra.existsSync(ignorePath)) {
    fsExtra.copyFileSync(path.join(__dirname, "gitignore"), ignorePath);
  }

  console.log("Installing packages. This might take a couple of minutes.");
  console.log();

  await installDeps(root, null);
  console.log();

  if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  let cdPath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdPath = appName;
  } else {
    cdPath = appPath;
  }

  console.log(`${chalk.green("Success!")} Created ${appName} at ${appPath}`);
  console.log("Inside that directory, you can run several commands:");

  const reactAppPath = path.join(root, "packages", "react-app");
  if (fsExtra.existsSync(reactAppPath)) {
    console.log();
    console.log(chalk.cyan("  yarn react-app:start"));
    console.log("    Starts the development server.");
    console.log();
    console.log(chalk.cyan("  yarn react-app:build"));
    console.log("    Builds the app for production.");
    console.log();
  }

  const vueAppPath = path.join(root, "packages", "vue-app");
  if (fsExtra.existsSync(vueAppPath)) {
    console.log();
    console.log(chalk.cyan("  yarn vue-app:serve"));
    console.log("    Starts the development server.");
    console.log();
    console.log(chalk.cyan("  yarn vue-app:build"));
    console.log("    Builds the app for production.");
    console.log();
  }

  const subgraphPath = path.join(root, "packages", "subgraph");
  if (fsExtra.existsSync(subgraphPath)) {
    console.log(chalk.cyan("  yarn subgraph:codegen"));
    console.log("    Generates AssemblyScript types for smart contract ABIs and the subgraph schema.");
    console.log();
    console.log(chalk.cyan("  yarn subgraph:deploy"));
    console.log("    Deploys the subgraph to the official Graph Node.");
    console.log();
  }

  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), cdPath);
  if (fsExtra.existsSync(reactAppPath)) {
    console.log(`  ${chalk.cyan("yarn react-app:start")}`);
  } else if (fsExtra.existsSync(vueAppPath)) {
    console.log(`  ${chalk.cyan("yarn vue-app:serve")}`);
  }
  console.log();
}
