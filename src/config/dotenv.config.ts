import path from "path";
import dotenv from "dotenv";

const configurationObject: Record<string, string> = {};

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
  processEnv: configurationObject,
});

export default configurationObject;
