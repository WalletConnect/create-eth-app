import { execSync } from "child_process";
import dns from "dns";
import got from "got";
import url from "url";

function getProxy(): string | undefined {
  if (process.env.https_proxy) {
    return process.env.https_proxy;
  }

  try {
    const httpsProxy = execSync("npm config get https-proxy").toString().trim();
    return httpsProxy !== "null" ? httpsProxy : undefined;
  } catch (e) {
    return;
  }
}

export function getOnline(): Promise<boolean> {
  return new Promise(function (resolve) {
    dns.lookup("registry.yarnpkg.com", function (registryErr) {
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

      dns.lookup(hostname, function (proxyErr) {
        resolve(proxyErr == null);
      });
    });
  });
}

export async function isUrlOk(urlToCheck: string): Promise<boolean> {
  const res = await got(urlToCheck).catch(function (error) {
    return error;
  });
  return res.statusCode === 200;
}
