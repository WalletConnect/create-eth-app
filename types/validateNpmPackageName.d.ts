declare module "validate-npm-package-name" {
  function validateNpmPackageName(projectName: string): {
    errors?: string[] | null;
    validForNewPackages: boolean;
    validForOldPackages: boolean;
    warnings?: string[] | null;
  };

  export default validateNpmPackageName;
}
