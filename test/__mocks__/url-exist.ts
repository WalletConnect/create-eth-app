import urlExists from "url-exist";

import { request } from "@octokit/request";

// Set this env variable when you hit the API rate limit while testing.
const githubOauthToken: string = process.env.GITHUB_OAUTH_TOKEN || "";

async function stubbedUrlExists(urlToCheck: string): Promise<boolean> {
  if (githubOauthToken) {
    try {
      const result = await request({
        headers: {
          authorization: "token " + githubOauthToken,
        },
        method: "HEAD",
        url: urlToCheck,
      });
      return result.status === 200;
    } catch (error) {
      return false;
    }
  } else {
    return urlExists(urlToCheck);
  }
}

export default stubbedUrlExists;
