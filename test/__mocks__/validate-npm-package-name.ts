function validateNpmPackageName(projectName: string): {
  errors?: string[] | null;
  validForNewPackages: boolean;
  warnings?: string[] | null;
} {
  if (projectName === "my-eth-app") {
    return {
      errors: [],
      validForNewPackages: true,
      warnings: [],
    };
  } else if (projectName === "error-triggering-name") {
    return {
      errors: ["Error"],
      validForNewPackages: false,
      warnings: [],
    };
  } else if (projectName === "warning-triggering-name") {
    return {
      errors: [],
      validForNewPackages: false,
      warnings: ["Warning"],
    };
  } else {
    return {
      errors: [],
      validForNewPackages: false,
      warnings: [],
    };
  }
}

export default validateNpmPackageName;
