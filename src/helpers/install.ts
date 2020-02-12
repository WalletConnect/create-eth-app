import chalk from "chalk";
import spawn from "cross-spawn";

export function install(root: string, dependencies: string[] | null, { isOnline }: { isOnline: boolean }) {
  return new Promise((resolve, reject) => {
    let command: string;
    let args: string[];
    command = "yarnpkg";

    args = dependencies ? ["add", "--exact"] : ["install"];
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

    const child = spawn(command, args, {
      env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
      stdio: "inherit",
    });
    child.on("close", (code: number) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });
}
