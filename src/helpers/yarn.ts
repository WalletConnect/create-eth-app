import chalk from "chalk";
import { execSync } from "child_process";

export function shouldUseYarn(): void {
  try {
    execSync("yarnpkg --version", { stdio: "ignore" });
  } catch (error) {
    console.error("Yarn is necessary for Create Eth App. Install it by following the official documentation:");
    console.log();
    console.log(chalk.cyan("  https://classic.yarnpkg.com/en/docs/install"));
    process.exit(1);
  }
}

export function shouldUseYarnWorkspaces(): void {
  const yarnVersion: string = execSync("yarnpkg --version", { encoding: "utf8" });
  const workspacesFlag: string = execSync("yarnpkg config get workspaces-experimental", { encoding: "utf8" });
  if (yarnVersion.startsWith("0") && !workspacesFlag.startsWith("true")) {
    console.error(
      "The Yarn Workspaces feature is necessary for Create Eth App. Please enable it by running this command:",
    );
    console.log();
    console.log(chalk.cyan("  yarn config set workspaces-experimental true"));
    process.exit(1);
  }
}
