import chalk from "chalk";
import cpy from "cpy";
import fs from "fs";
import makeDir from "make-dir";
import os from "os";
import path from "path";

import { downloadAndExtractTemplate } from "./helpers/template";
import { getOnline } from "./helpers/isOnline";
import { install } from "./helpers/install";
import { isFolderEmpty } from "./helpers/isFolderEmpty";
import { shouldUseYarn, shouldUseYarnWorkspaces } from "./helpers/yarn";
import { tryGitInit } from "./helpers/git";

export async function createEthApp({ appPath, useNpm }: { appPath: string; useNpm: boolean; example?: string }) {
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

  console.log(`Creating a new Ethereum-powered React app in ${chalk.green(root)}.`);
  console.log();

  await makeDir(root);
  process.chdir(root);

  console.log("Downloading template files. This might take a moment.");
  console.log();
  await downloadAndExtractTemplate(root);

  console.log(`Initializing monorepo with ${chalk.cyan("yarn workspaces")}. This might take a couple of minutes.`);
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
  console.log(chalk.cyan("  yarn subgraph:codegen"));
  console.log("    Generates AssemblyScript types for smart contract ABIs and the subgraph schema.");
  console.log();
  console.log(chalk.cyan("  yarn subgraph:deploy"));
  console.log("    Deploys the subgraph to the official Graph Node.");
  console.log();
  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), cdPath);
  console.log(`  ${chalk.cyan("yarn react-app:start")}`);
  console.log();
}
