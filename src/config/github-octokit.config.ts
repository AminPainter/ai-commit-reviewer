import { Octokit } from "@octokit/rest";

import envConfig from "./env.config";

const githubOctokitConfig = new Octokit({
  auth: envConfig.github.authToken,
});

export default githubOctokitConfig;
