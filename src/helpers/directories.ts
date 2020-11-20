import chalk from "chalk";
import fs from "fs";
import path from "path";

export function isDirectoryEmpty(directoryPath: string, appName: string): boolean {
  const validFiles: string[] = [
    ".DS_Store",
    ".git",
    ".gitattributes",
    ".gitignore",
    ".gitlab-ci.yml",
    ".hg",
    ".hgcheck",
    ".hgignore",
    ".idea",
    ".npmignore",
    ".travis.yml",
    ".yarn",
    ".yarnrc.yml",
    "LICENSE",
    "Thumbs.db",
    "docs",
    "mkdocs.yml",
    "npm-debug.log",
    "yarn-debug.log",
    "yarn-error.log",
  ];

  const conflicts: string[] = fs
    .readdirSync(directoryPath)
    .filter(function (file: string) {
      return validFiles.includes(file) === false;
    })
    // Support IntelliJ IDEA-based editors
    .filter(function (file: string) {
      return /\.iml$/.test(file) === false;
    });

  if (conflicts.length > 0) {
    console.log("The directory " + chalk.green(appName) + " contains files that could conflict:");
    console.log();
    for (const file of conflicts) {
      try {
        const stats: fs.Stats = fs.lstatSync(path.join(directoryPath, file));
        if (stats.isDirectory()) {
          console.log(`  ${chalk.blue(file)}/`);
        } else {
          console.log(`  ${file}`);
        }
      } catch {
        console.log(`  ${file}`);
      }
    }
    console.log();
    console.log("Either try using a new directory name, or remove the files listed above.");
    console.log();
    return false;
  }

  return true;
}
