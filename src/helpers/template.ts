import got from "got";
import promisePipe from "promisepipe";
import tar from "tar";

export async function downloadAndExtractTemplate(root: string): Promise<void> {
  return await promisePipe(
    got.stream("https://codeload.github.com/PaulRBerg/cea-template/tar.gz/develop"),
    tar.extract({ cwd: root, strip: 1 }),
  );
}
