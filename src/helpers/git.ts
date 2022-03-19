import { execSync } from "child_process";
import fsExtra from "fs-extra";
import path from "path";

export function isInGitRepository(): boolean {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    return true;
  } catch (_) {
    // Ignore error.
  }
  return false;
}

export function isInMercurialRepository(): boolean {
  try {
    execSync("hg --cwd . root", { stdio: "ignore" });
    return true;
  } catch (_) {
    // Ignore error.
  }
  return false;
}

export function tryGitInit(root: string): boolean {
  let didInit: boolean = false;
  try {
    execSync("git --version", { stdio: "ignore" });
    if (isInGitRepository() || isInMercurialRepository()) {
      return false;
    }

    execSync("git init", { stdio: "ignore" });
    didInit = true;

    execSync("git add -A", { stdio: "ignore" });
    execSync('git commit -m "Initial commit from Create Eth App"', {
      stdio: "ignore",
    });
    return true;
  } catch (error) {
    if (didInit) {
      try {
        fsExtra.removeSync(path.join(root, ".git"));
      } catch (_) {
        // Ignore error.
      }
    }
    return false;
  }
}
