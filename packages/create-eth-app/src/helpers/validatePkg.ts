import validateProjectName from "validate-npm-package-name";

export function validateNpmName(name: string): { valid: boolean; problems?: string[] } {
  const nameValidation = validateProjectName(name);
  if (nameValidation.validForNewPackages) {
    return { valid: true };
  }

  return {
    problems: [...(nameValidation.errors || []), ...(nameValidation.warnings || [])],
    valid: false,
  };
}
