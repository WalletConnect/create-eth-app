import chalk from "chalk";
import cpy from "cpy";
import fs from "fs";
import makeDir from "make-dir";
import os from "os";
import path from "path";

import { downloadAndExtractExample, hasExample } from "./helpers/examples";
import { tryGitInit } from "./helpers/git";
import { install } from "./helpers/install";
import { isFolderEmpty } from "./helpers/isFolderEmpty";
import { getOnline } from "./helpers/isOnline";
import { shouldUseYarn } from "./helpers/shouldUseYarn";

export async function createEthApp({ appPath, useNpm, example }: { appPath: string; useNpm: boolean; example?: string }) {
  if (example) {
    const found: boolean = await hasExample(example);
    if (!found) {
      console.error(
        `Could not locate an example named ${chalk.red(`"${example}"`)}. Please check your spelling and try again.`,
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

  const useYarn = useNpm ? false : shouldUseYarn();
  const isOnline = !useYarn || (await getOnline());
  const originalDirectory = process.cwd();

  const displayedCommand = useYarn ? "yarn" : "npm";
  console.log(`Creating a new Ethereum-powered React app in ${chalk.green(root)}.`);
  console.log();

  await makeDir(root);
  process.chdir(root);

  if (example) {
    console.log(`Downloading files for example ${chalk.cyan(example)}. This might take a moment.`);
    console.log();
    await downloadAndExtractExample(root, example);

    /* Copy our default `.gitignore` if the application did not provide one */
    const ignorePath = path.join(root, ".gitignore");
    if (!fs.existsSync(ignorePath)) {
      fs.copyFileSync(path.join(__dirname, "templates", "default", "gitignore"), ignorePath);
    }

    console.log("Installing packages. This might take a couple of minutes.");
    console.log();

    await install(root, null, { useYarn, isOnline });
    console.log();
  } else {
    const packageJson = {
      name: appName,
      private: true,
      scripts: { dev: "cea-scripts dev", build: "cea-scripts build", start: "cea-scripts start" },
      version: "0.1.0",
    };
    fs.writeFileSync(path.join(root, "package.json"), JSON.stringify(packageJson, null, 2) + os.EOL);

    console.log(
      `Installing ${chalk.cyan("react")}, ${chalk.cyan("react-dom")}, and ${chalk.cyan(
        "cea-scripts",
      )} using ${displayedCommand}...`,
    );
    console.log();

    await install(root, ["react", "react-dom", "cea-scripts"], { useYarn, isOnline });
    console.log();

    await cpy("**", root, {
      cwd: path.join(__dirname, "templates", "default"),
      parents: true,
      rename: name => {
        switch (name) {
          case "gitignore": {
            return ".".concat(name);
          }
          default: {
            return name;
          }
        }
      },
    });
  }

  if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green("Success!")} Created ${appName} at ${appPath}`);
  console.log("Inside that directory, you can run several commands:");
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? "" : "run "}dev`));
  console.log("    Starts the development server.");
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? "" : "run "}build`));
  console.log("    Builds the app for production.");
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} start`));
  console.log("    Runs the built app in production mode.");
  console.log();
  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), cdpath);
  console.log(`  ${chalk.cyan(`${displayedCommand} ${useYarn ? "" : "run "}dev`)}`);
  console.log();
}
