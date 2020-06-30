import chalk from "chalk";

export function throwFrameworkNotFoundError(framework: string): void {
  console.error(
    `Could not locate a UI framework named ${chalk.red(`"${framework}"`)}. Please check your spelling and try again.`,
  );
  process.exit(1);
}

export function throwTemplateNotFoundError(template: string): void {
  console.error(
    `Could not locate a template named ${chalk.red(`"${template}"`)}. Please check your spelling and try again.`,
  );
  process.exit(1);
}
