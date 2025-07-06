import { WebClient } from "@slack/web-api";

import envConfig from "./env.config";

const slackClient = new WebClient(envConfig.slack.botUserOauthToken);

export default slackClient;
