import { TMarkdown } from "../types";

interface ICommunicationService {
  postMessage(messageConfig: { text: TMarkdown }): Promise<void>;
}

export default ICommunicationService;
