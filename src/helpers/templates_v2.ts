/* eslint-disable @typescript-eslint/no-non-null-assertion */
import path from "path";

// Extract package name from tarball url or path.
export async function getPackageInfo(installPackage: string): Promise<{ name: string; version?: string }> {
  if (installPackage.match(/.+@/)) {
    // Do not match @scope/ when stripping off @version or @tag
    return Promise.resolve({
      name: installPackage.charAt(0) + installPackage.substr(1).split("@")[0],
      version: installPackage.split("@")[1],
    });
  } else if (installPackage.match(/^file:/)) {
    const installPackagePath = installPackage.match(/^file:(.*)?$/)![1];
    const { name, version } = await import(path.join(installPackagePath, "package.json"));
    return { name, version };
  }
  return { name: installPackage };
}

export function getTemplateInstallPackage(template: string, originalDirectory: string): string {
  let templateToInstall: string = "cea-template";

  if (template) {
    if (template.match(/^file:/)) {
      templateToInstall = `file:${path.resolve(originalDirectory, template.match(/^file:(.*)?$/)![1])}`;
    } else {
      // Add prefix "cea-template-"" to non-prefixed templates, leaving any @scope/ and @version intact.
      const packageMatch = template.match(/^(@[^/]+\/)?([^@]+)?(@.+)?$/);

      let scope: string = "";
      let templateName: string = "";
      let version: string = "";

      if (packageMatch) {
        scope = packageMatch[1] || "";
        templateName = packageMatch[2] || "";
        version = packageMatch[3] || "";
      }

      if (templateName === templateToInstall || templateName.startsWith(`${templateToInstall}-`)) {
        // Covers:
        // - cea-template
        // - @SCOPE/cea-template
        // - cea-template-NAME
        // - @SCOPE/cea-template-NAME
        templateToInstall = `${scope}${templateName}${version}`;
      } else if (version && !scope && !templateName) {
        // Covers using @SCOPE only
        templateToInstall = `${version}/${templateToInstall}`;
      } else {
        // Covers templates without the `cea-template` prefix:
        // - NAME
        // - @SCOPE/NAME
        templateToInstall = `${scope}${templateToInstall}-${templateName}${version}`;
      }
    }
  }

  return templateToInstall;
}
