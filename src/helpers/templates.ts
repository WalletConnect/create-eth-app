import got from "got";
import promisePipe from "promisepipe";
import tar from "tar";

export type RepoInfo = {
  username: string;
  name: string;
  branch: string;
  filePath: string;
};

export async function downloadAndExtractTemplate(root: string, name: string): Promise<void> {
  return await promisePipe(
    got.stream("https://codeload.github.com/paulrberg/create-eth-app/tar.gz/develop"),
    tar.extract({ cwd: root, strip: 3 }, [`create-eth-app-develop/templates/${name}`]),
  );
}

export function downloadAndExtractDefaultTemplate(root: string, framework: string): Promise<boolean> {
  switch(framework) {
    case "react":
      return promisePipe(
        got.stream("https://codeload.github.com/paulrberg/cea-template/tar.gz/develop"),
        tar.extract({ cwd: root, strip: 1 }),
      );
    case "vue":
      return promisePipe(
        got.stream("https://codeload.github.com/raid-guild/buidler-waffle-typechain-oz-vue/tar.gz/master"),
        tar.extract({ cwd: root, strip: 1 }),
      );
    default:
      return new Promise(() => {throw new Error(`There's no default template for ${framework}!`)});
  }
}

export async function hasTemplate(name: string): Promise<boolean> {
  return await isUrlOk(
    `https://api.github.com/repos/paulrberg/create-eth-app/contents/templates/${encodeURIComponent(name)}/package.json`,
  );
}

export async function isUrlOk(url: string): Promise<boolean> {
  const res = await got(url).catch(e => e);
  return res.statusCode === 200;
}
