import packageJson from "../../package.json";
import { semanticVersionRegex } from "./constants";

const packageVersionRegex: RegExp = new RegExp("^v" + semanticVersionRegex.source + "$");

/**
 * If the program is run in CI, return the GitHub Actions env variables.
 * If it is run in development mode, return the development env variables.
 * Otherwise, assume it is production mode and use the package version.
 */
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
      // TODO: handle "refs/", "refs/tags/", etc.
      ref = process.env.GITHUB_REF.replace("refs/heads/", "");
      if (packageVersionRegex.test(ref)) {
        tarGzRef = ref.slice(1);
      } else {
        tarGzRef = ref.replace(new RegExp(/\//g), "-");
      }
    }
  }

  return { ref, tarGzRef };
}

/**
 * If the program is run in CI, source the GitHub Actions env variable.
 * Otherwise, assume it is production mode and use the package repository name.
 */
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
