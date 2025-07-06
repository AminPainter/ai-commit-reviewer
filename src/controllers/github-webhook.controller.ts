import { Request, Response } from "express";

import BaseApiController from "./base-api-controller";
import GithubWebhookService from "../services/github-webhook.service";

class GithubWebhookController extends BaseApiController {
  private githubWebhookService: GithubWebhookService;

  constructor() {
    super("github-webhooks");

    this.githubWebhookService = new GithubWebhookService();
  }

  setupRoutes() {
    this.router.get("/", this.processGithubWebhook.bind(this));
  }

  private async processGithubWebhook(req: Request, res: Response) {
    const signature = req.headers["x-hub-signature-256"];
    if (typeof signature !== "string")
      throw new Error("Missing GitHub webhook signature");

    await this.githubWebhookService.processGithubWebhook(signature, req.body);

    res.json({ status: "success" });
  }
}

export default new GithubWebhookController();
