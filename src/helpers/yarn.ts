import chalk from "chalk";
import { execSync } from "child_process";
import type { ChildProcess } from "child_process";
import spawn from "cross-spawn";

export function installDeps(
  root: string,
  dependencies: string[] | null,
  { isOnline }: { isOnline: boolean },
): Promise<void> {
  return new Promise(function (resolve, reject) {
    const command: string = "yarnpkg";
    const args: string[] = dependencies ? ["add", "--exact"] : ["install"];

    if (!isOnline) {
      args.push("--offline");
    }
    if (dependencies) {
      args.push(...dependencies);
    }
    args.push("--cwd", root);

    if (!isOnline) {
      console.log(chalk.yellow("You appear to be offline."));
      console.log(chalk.yellow("Falling back to the local Yarn cache."));
      console.log();
    }

    const child: ChildProcess = spawn(command, args, {
      env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
      stdio: "inherit",
    });
    child.on("close", function (code: number) {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });
}

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
  if (yarnVersion.startsWith("0")) {
    const workspacesFlag: string = execSync("yarnpkg config get workspaces-experimental", { encoding: "utf8" });
    if (!workspacesFlag.startsWith("true")) {
      console.error(
        "The Yarn Workspaces feature is necessary for Create Eth App. Please enable it by running this command:",
      );
      console.log();
      console.log(chalk.cyan("  yarn config set workspaces-experimental true"));
      process.exit(1);
    }
  }
}
