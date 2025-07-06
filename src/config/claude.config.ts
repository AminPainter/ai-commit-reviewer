import { Anthropic } from "@anthropic-ai/sdk";

import envConfig from "./env.config";

const anthropic = new Anthropic({
  apiKey: envConfig.claude.apiKey,
});

export default anthropic;
