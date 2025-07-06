import { WebClient } from "@slack/web-api";

import { ICommunicationService } from "../interfaces";
import { TMarkdown } from "../types";

class SlackService implements ICommunicationService {
  private client: WebClient;
  private communicationChannelId: string;

  constructor({
    slackClient,
    communicationChannelId,
  }: {
    slackClient: WebClient;
    communicationChannelId: string;
  }) {
    this.client = slackClient;
    this.communicationChannelId = communicationChannelId;
  }

  async postMessage(messageConfig: { text: TMarkdown }) {
    await this.client.chat.postMessage({
      channel: this.communicationChannelId,
      text: messageConfig.text,
      mrkdwn: true,
    });
  }
}

export default SlackService;
