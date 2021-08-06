import { execSync } from "child_process";

import chalk from "chalk";
import semver from "semver";

import packageJson from "../../package.json";
import { semanticVersionRegex } from "./constants";

const packageVersionRegex: RegExp = new RegExp("^v" + semanticVersionRegex.source + "$");

export function checkNode(): void {
  if (!semver.satisfies(semver.coerce(process.version) || "v0", ">=10")) {
    console.error(
      chalk.red(
        "You are running Node %s.\n" +
          "Create Eth App requires Node v10 or higher. \n" +
          "Please update your version of Node.",
      ),
      process.version,
    );
  }
}

export function checkYarn(): void {
  try {
    execSync("yarnpkg --version", { stdio: "ignore" });
  } catch (error) {
    console.error("Create Eth App requires Yarn. Please install it by following the official documentation:");
    console.log();
    console.log(chalk.cyan("  https://classic.yarnpkg.com/en/docs/install"));
    process.exit(1);
  }
}

export function checkYarnWorkspaces(): void {
  const yarnVersion: string = execSync("yarnpkg --version", { encoding: "utf8" });
  if (semver.satisfies(yarnVersion, ">=1.0.0")) {
    const workspacesFlag: string = execSync("yarnpkg config get workspaces-experimental", { encoding: "utf8" });
    if (!workspacesFlag.startsWith("true")) {
      console.error(
        "The Yarn Workspaces feature is necessary for Create Eth App. Please enable it by running this command:\n" +
          chalk.cyan("  yarn config set workspaces-experimental true"),
      );
      console.log();
      process.exit(1);
    }
  }
}

/// If the program is run in CI, return the GitHub Actions env variables.
/// If it is run in development mode, return the development env variables.
/// Otherwise, assume it is production mode and use the package version.
export function getRefs(): { ref: string; tarGzRef: string } {
  let ref: string = "";
  let tarGzRef: string = "";

  if (!process.env.CI) {
    if (process.env.CEA_ENV === "development") {
      if (!process.env.DEVELOPMENT_REF) {
        console.log("Please set a DEVELOPMENT_REF environment variable.");
        process.exit(1);
      } else {
        ref = process.env.DEVELOPMENT_REF;
      }

      if (packageVersionRegex.test(ref)) {
        tarGzRef = ref.slice(1);
      } else {
        tarGzRef = ref.replace(new RegExp(/\//g), "-");
      }
    } else {
      ref = "v" + packageJson.version;
      tarGzRef = packageJson.version;
    }
  } else {
    if (!process.env.GITHUB_REF) {
      console.log("Please set a GITHUB_REF environment variable.");
      process.exit(1);
    } else {
      ref = process.env.GITHUB_REF;
      if (packageVersionRegex.test(ref)) {
        tarGzRef = ref.slice(1);
      } else {
        tarGzRef = ref.replace(new RegExp(/\//g), "-");
      }
    }
  }

  return { ref, tarGzRef };
}

/// If the program is run in CI, source the GitHub Actions env variable.
/// Otherwise, assume it is production mode and use the package repository name.
export function getRepository(): string {
  if (!process.env.CI) {
    return packageJson.repository.name;
  } else {
    if (!process.env.GITHUB_REPOSITORY) {
      console.log("Please set a GITHUB_REPOSITORY environment variable.");
      process.exit(1);
    } else {
      return process.env.GITHUB_REPOSITORY;
    }
  }
}
