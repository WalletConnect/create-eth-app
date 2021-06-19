import { execSync } from "child_process";
import dns from "dns";
import url from "url";

export function getProxy(): string {
  if (process.env.https_proxy) {
    return process.env.https_proxy;
  }

  try {
    const httpsProxy = execSync("npm config get https-proxy").toString().trim();
    if (httpsProxy !== "null") {
      return httpsProxy;
    } else {
      return "";
    }
  } catch (e) {
    return "";
  }
}

export function getOnline(): Promise<boolean> {
  return new Promise(function (resolve) {
    dns.lookup("registry.yarnpkg.com", function (registryErr: NodeJS.ErrnoException | null) {
      if (!registryErr) {
        return resolve(true);
      }

      const proxy = getProxy();
      if (!proxy) {
        return resolve(false);
      }

      const { hostname } = url.parse(proxy);
      if (!hostname) {
        return resolve(false);
      }

      dns.lookup(hostname, function (proxyErr: NodeJS.ErrnoException | null) {
        resolve(proxyErr == null);
      });
    });
  });
}
