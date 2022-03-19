#!/usr/bin/env node
import chalk from "chalk";
import Commander from "commander";
import path from "path";
import prompts from "prompts";
import updateCheck from "update-check";

import packageJson from "../package.json";
import { createEthApp } from "./createEthApp";
import { checkNode, checkYarn, checkYarnWorkspaces } from "./helpers/env";
import { validatePkgName } from "./helpers/npm";

let appPath: string = "";

const program: Commander.Command = new Commander.Command(packageJson.name)
  .version(packageJson.version, "-v, --version", "Output the version number")
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action(function (name: string) {
    appPath = name;
  })
  .option(
    "-t, --template <name>",
    `
  The template to bootstrap the created app with.
`,
  )
  .allowUnknownOption()
  .on("--help", () => {
    console.log(`    Only ${chalk.green("<project-directory>")} is required.`);
    console.log();
    console.log(`    A custom ${chalk.cyan("--template")} can be one of:`);
    console.log(`      - a custom template published on npm: ${chalk.green("cea-template-uniswap-v3")}`);
    console.log(
      `      - a local path relative to the current working directory: ${chalk.green("file:../my-custom-template")}`,
    );
    console.log();
    console.log(`    If you have any problems, do not hesitate to file an issue:`);
    console.log(`      ${chalk.cyan("https://github.com/paulrberg/create-eth-app/issues/new")}`);
    console.log();
  })
  .parse(process.argv);

async function run(): Promise<void> {
  // Check the node.js and yarn installations.
  checkNode();
  checkYarn();
  checkYarnWorkspaces();

  if (typeof appPath === "string") {
    appPath = appPath.trim();
  }

  // Promp the user to provide a path if they didn't provide one from the get-go.
  if (!appPath) {
    const result: prompts.Answers<string> = await prompts({
      initial: "my-eth-app",
      message: "What is your project named?",
      name: "path",
      type: "text",
      validate: function (name: string) {
        const validation: { valid: boolean; problems?: string[] } = validatePkgName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }

        if (validation.problems && validation.problems[0]) {
          return "Invalid project name: " + validation.problems[0];
        } else {
          return "Invalid project name";
        }
      },
    });

    if (typeof result.path === "string") {
      appPath = result.path.trim();
    }
  }

  // Halt the execution if no path was provided.
  if (!appPath) {
    console.log();
    console.log("Please specify the project directory:");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("my-eth-app")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
    process.exit(1);
  }

  // Resolve the path.
  const resolvedAppPath = path.resolve(appPath);
  const projectName = path.basename(resolvedAppPath);

  // Check the package name.
  const { problems, valid: isPackageNameValid } = validatePkgName(projectName);
  if (!isPackageNameValid) {
    console.error(
      `Could not create a project called ${chalk.red(`"${projectName}"`)} because of npm naming restrictions:`,
    );

    if (problems) {
      problems.forEach(function (problem: string) {
        return console.error(`    ${chalk.red.bold("*")} ${problem}`);
      });
    }
    process.exit(1);
  }

  // Run the idiosyncratic CEA program.
  const options = program.opts();
  const template: string | undefined = (typeof options.template === "string" && options.template.trim()) || undefined;
  await createEthApp(resolvedAppPath, template);
}

const update = updateCheck(packageJson).catch(function () {
  return null;
});

async function notifyUpdate(): Promise<void> {
  try {
    const res = await update;
    if (res?.latest) {
      console.log();
      console.log(chalk.yellow.bold("A new version of `create-eth-app` is available!"));
      console.log("You can update by running: yarn global add create-eth-app");
      console.log();
    }
  } catch {
    // Ignore error.
  }
}

run()
  .then(notifyUpdate)
  .catch(async function (reason) {
    {
      console.log();
      console.log("Aborting installation.");

      if (reason.command) {
        console.log(`  ${chalk.cyan(reason.command)} has failed.`);
      } else {
        console.log(chalk.red("Unexpected error. Please report it as a bug:"));
        console.log(reason);
      }
      console.log();

      await notifyUpdate();

      process.exit(1);
    }
  });
