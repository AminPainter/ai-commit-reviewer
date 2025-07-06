import Anthropic from "@anthropic-ai/sdk";

import { IAICodeReviewer } from "../interfaces";
import { TMarkdown } from "../types";

class ClaudeService implements IAICodeReviewer {
  private anthropic: Anthropic;

  constructor(anthropic: Anthropic) {
    this.anthropic = anthropic;
  }

  async reviewCode({
    initialContext,
    prompt,
  }: {
    initialContext: string;
    prompt: string;
  }) {
    const response = await this.sendMessageToClaude(initialContext, prompt);
    const responseMarkdown = this.transformResponseToMakdown(response);
    return responseMarkdown;
  }

  private transformResponseToMakdown(
    response: Anthropic.Messages.Message
  ): TMarkdown {
    return response.content
      .map((c) => (c.type === "text" ? c.text : ""))
      .join("\n");
  }

  private async sendMessageToClaude(initialContext: string, prompt: string) {
    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-0",
      max_tokens: 1500,
      temperature: 0.2,
      system: initialContext,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    return response;
  }
}

export default ClaudeService;
