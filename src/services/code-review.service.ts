import { IAICodeReviewer, ICommunicationService } from "../interfaces";
import PromptBuilder from "../helpers/prompt-builder";

class CodeReviewService {
  private aiCodeReviewer: IAICodeReviewer;
  private promptBuilder: PromptBuilder;
  private reviewCommunicator: ICommunicationService;

  constructor({
    aiReviewer,
    promptBuilder,
    reviewCommunicator,
  }: {
    aiReviewer: IAICodeReviewer;
    promptBuilder: PromptBuilder;
    reviewCommunicator: ICommunicationService;
  }) {
    this.aiCodeReviewer = aiReviewer;
    this.promptBuilder = promptBuilder;
    this.reviewCommunicator = reviewCommunicator;
  }

  async performCodeReview() {
    const review = await this.getCodeReview();
    await this.reviewCommunicator.postMessage({ text: review });
  }

  private async getCodeReview() {
    const prompt = this.promptBuilder.buildPrompt();
    const review = await this.aiCodeReviewer.reviewCode({
      prompt,
      initialContext: "You are an expert software engineer",
    });
    return review;
  }
}

export default CodeReviewService;
