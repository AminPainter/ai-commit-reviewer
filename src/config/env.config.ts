import { z } from "zod";

import configurationObject from "./dotenv.config";

const envVarsSchema = z.strictObject({
  NODE_ENV: z.enum(["development"]),
  PORT: z.coerce.number(),
  SLACK_BOT_USER_OAUTH_TOKEN: z.string().min(1),
  SLACK_CODE_QUALITY_ALERTS_CHANNEL_ID: z.string().min(1),
  GITHUB_AUTH_TOKEN: z.string().min(1),
  GITHUB_WEBHOOK_SECRET: z.string().min(1),
  CLAUDE_API_KEY: z.string().min(1),
});

const { data: envVars, error } = envVarsSchema.safeParse(configurationObject);
if (error) throw new Error(`Environment configuration error: ${error.message}`);

const envConfig = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  slack: {
    botUserOauthToken: envVars.SLACK_BOT_USER_OAUTH_TOKEN,
    codeQualityAlertsChannelId: envVars.SLACK_CODE_QUALITY_ALERTS_CHANNEL_ID,
  },
  github: {
    authToken: envVars.GITHUB_AUTH_TOKEN,
    webhookSecret: envVars.GITHUB_WEBHOOK_SECRET,
  },
  claude: {
    apiKey: envVars.CLAUDE_API_KEY,
  },
};

export default envConfig;
