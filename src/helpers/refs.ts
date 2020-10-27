import packageJson from "../../package.json";

/* https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string */
const semanticVersionRegex: RegExp = /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/;
const packageVersionRegex: RegExp = new RegExp("^v" + semanticVersionRegex.source + "$");

let githubRef: string = "";
if (process.env.GITHUB_REF) {
  githubRef = process.env.GITHUB_REF;
} else if (process.env.CEA_GITHUB_REF) {
  githubRef = process.env.CEA_GITHUB_REF;
} else {
  console.log("Please set either a GITHUB_REF or a CEA_GITHUB_REF environment variable.");
  process.exit(1);
}

/**
 * If the program is run in development mode, we source the templates from
 * a development ref. In production, we use the current version of the
 * package prepended by the letter "v".
 */
export function getRefs(): { ref: string; tarGzRef: string } {
  let ref: string;
  let tarGzRef: string;

  if (process.env.CEA_ENV === "development") {
    if (packageVersionRegex.test(githubRef)) {
      /* This is a version tag, like "v1.4.1" */
      ref = githubRef;
      tarGzRef = githubRef.slice(1);
    } else {
      /* This is a branch name, like "develop". */
      ref = githubRef;
      tarGzRef = githubRef;
    }
  } else {
    /* This is a version tag, like "v1.4.1" */
    ref = "v" + packageJson.version;
    tarGzRef = packageJson.version;
  }

  return { ref, tarGzRef };
}
