import { TMarkdown } from "../types";

interface IAICodeReviewer {
  reviewCode(reviewConfig: {
    initialContext: string;
    prompt: string;
  }): Promise<TMarkdown>;
}

export default IAICodeReviewer;
