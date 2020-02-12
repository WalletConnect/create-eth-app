import validateProjectName from "validate-npm-package-name";

export function validateNpmName(name: string): { problems?: string[]; valid: boolean } {
  const nameValidation = validateProjectName(name);
  if (nameValidation.validForNewPackages) {
    return { valid: true };
  }

  return {
    problems: [...(nameValidation.errors || []), ...(nameValidation.warnings || [])],
    valid: false,
  };
}
