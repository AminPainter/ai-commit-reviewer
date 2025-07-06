import anthropic from "../config/claude.config";
import envConfig from "../config/env.config";
import githubOctokitConfig from "../config/github-octokit.config";
import slackClient from "../config/slack.config";
import PromptBuilder from "../helpers/prompt-builder";

import ClaudeService from "./claude.service";
import CodeReviewService from "./code-review.service";
import GithubService from "./github.service";
import SlackService from "./slack.service";

class GithubWebhookService {
  private codeReviewService: CodeReviewService;
  private githubService: GithubService;

  constructor() {
    const aiReviewer = new ClaudeService(anthropic);
    const promptBuilder = new PromptBuilder();
    const reviewCommunicator = new SlackService({
      slackClient,
      communicationChannelId: envConfig.slack.codeQualityAlertsChannelId,
    });

    this.codeReviewService = new CodeReviewService({
      aiReviewer,
      promptBuilder,
      reviewCommunicator,
    });

    this.githubService = new GithubService(githubOctokitConfig);
  }

  async processGithubWebhook(signature: string, payload: string) {
    this.githubService.verifyWebhookSignature(
      signature,
      payload,
      envConfig.github.webhookSecret
    );

    // TODO: Fetch commit details from Github and pass it to the code review service
    // const parsedPayload = JSON.parse(payload);

    // await this.githubService.getCommitDetails({
    //   ownerName: parsedPayload.respository.owner.name,
    //   repoName: parsedPayload.respository.name,
    //   commitId: parsedPayload.commits[0].id,
    // });

    await this.codeReviewService.performCodeReview();
  }
}

export default GithubWebhookService;
