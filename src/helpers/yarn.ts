import chalk from "chalk";
import os from "os";
import { execSync } from "child_process";

export function shouldUseYarn() {
  try {
    execSync("yarnpkg --version", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
}

export function shouldUseYarnWorkspaces() {
  const isWorkspacesActivated: string = execSync("yarn config get workspaces-experimental", { encoding: "utf8" });
  if (isWorkspacesActivated.replace(os.EOL, "") !== "true") {
    console.error(
      `The workspaces feature is necessary for Create Eth App but is disabled in your Yarn config. Please activate it by running this command:`,
    );
    console.log();
    console.log(chalk.cyan("  yarn config set workspaces-experimental true"));
    process.exit(1);
  }
}
