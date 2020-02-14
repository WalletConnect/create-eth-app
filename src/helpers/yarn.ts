import chalk from "chalk";
import os from "os";
import { execSync } from "child_process";

export function shouldUseYarn(): void {
  try {
    execSync("yarnpkg --version", { stdio: "ignore" });
  } catch (e) {
    console.error(
      "Yarn is necessary for Create Eth App. Install it by following the official documentation:",
    );
    console.log();
    console.log(chalk.cyan("  https://classic.yarnpkg.com/en/docs/install"));
    process.exit(1);
  }
}

export function shouldUseYarnWorkspaces(): void {
  const result: string = execSync("yarnpkg config get workspaces-experimental", { encoding: "utf8" });
  if (result.replace(os.EOL, "") !== "true") {
    console.error(
      "The Yarn Workspaces feature is necessary for Create Eth App. Please enable it by running this command:",
    );
    console.log();
    console.log(chalk.cyan("  yarn config set workspaces-experimental true"));
    process.exit(1);
  }
}
