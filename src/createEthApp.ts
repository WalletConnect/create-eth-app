import chalk from "chalk";
import fs from "fs";
import makeDir from "make-dir";
import path from "path";

import { downloadAndExtractDefaultTemplate, downloadAndExtractTemplate, hasTemplate } from "./helpers/templates";
import { getOnline } from "./helpers/isOnline";
import { install } from "./helpers/install";
import { isFolderEmpty } from "./helpers/isFolderEmpty";
import { shouldUseYarn, shouldUseYarnWorkspaces } from "./helpers/yarn";
import { tryGitInit } from "./helpers/git";

export async function createEthApp({ appPath, template }: { appPath: string; template?: string }) {
  if (template) {
    if (template === "uniswap") {
      template = "uniswap-v1";
    }
    const found = await hasTemplate(template);

    if (!found) {
      console.error(
        `Could not locate a template named ${chalk.red(`"${template}"`)}. Please check your spelling and try again.`,
      );
      process.exit(1);
    }
  }

  const root = path.resolve(appPath);
  const appName = path.basename(root);

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  shouldUseYarn();
  shouldUseYarnWorkspaces();
  const isOnline = await getOnline();
  const originalDirectory = process.cwd();

  console.log();
  console.log(`Creating a new Ethereum-powered React app in ${chalk.green(root)}.`);
  console.log();

  await makeDir(root);
  process.chdir(root);

  if (template) {
    console.log(`Downloading files for template ${chalk.cyan(template)}. This might take a moment.`);
    console.log();
    await downloadAndExtractTemplate(root, template);

    /* Copy our default `.gitignore` if the application did not provide one */
    const ignorePath = path.join(root, ".gitignore");
    if (!fs.existsSync(ignorePath)) {
      fs.copyFileSync(path.join(__dirname, "gitignore"), ignorePath);
    }
  } else {
    console.log("Downloading template files. This might take a moment.");
    console.log();
    await downloadAndExtractDefaultTemplate(root);
  }

  console.log("Installing packages. This might take a couple of minutes.");
  console.log();

  await install(root, null, { isOnline });
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
  console.log();
  console.log(chalk.cyan("  yarn react-app:start"));
  console.log("    Starts the development server.");
  console.log();
  console.log(chalk.cyan("  yarn react-app:build"));
  console.log("    Builds the app for production.");
  console.log();
  const subgraphPath = path.join(root, "packages", "subgraph");
  if (fs.existsSync(subgraphPath)) {
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
  console.log(`  ${chalk.cyan("yarn react-app:start")}`);
  console.log();
}
