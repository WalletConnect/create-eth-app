import chalk from "chalk";

export function consoleErrorFrameworkNotFound(framework: string): void {
  console.error(
    `Could not find a UI framework named ${chalk.red(`"${framework}"`)}. Please check your spelling and try again.`,
  );
  process.exit(1);
}

export function consoleErrorTemplateNotFound(template: string): void {
  console.error(
    `Could not find a template named ${chalk.red(`"${template}"`)}. Please check your spelling and try again.`,
  );
  process.exit(1);
}
