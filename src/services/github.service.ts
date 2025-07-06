import { Octokit } from "@octokit/rest";
import { createHmac } from "crypto";

class GithubService {
  private octokit: Octokit;

  constructor(githubOctokitConfig: Octokit) {
    this.octokit = githubOctokitConfig;
  }

  async getCommitDetails({
    ownerName,
    repoName,
    commitId,
  }: {
    ownerName: string;
    repoName: string;
    commitId: string;
  }) {
    const response = await this.octokit.rest.repos.getCommit({
      owner: ownerName,
      repo: repoName,
      ref: commitId,
    });
    return response.data;
  }

  verifyWebhookSignature(
    signature: string | undefined,
    body: string,
    secret?: string
  ): boolean {
    if (!secret || !signature) return true;
    const expectedSignature =
      "sha256=" + createHmac("sha256", secret).update(body).digest("hex");
    return signature === expectedSignature;
  }
}

export default GithubService;
