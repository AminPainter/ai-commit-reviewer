import app from "./app";
import envConfig from "./config/env.config";

app.listen(envConfig.port, () => {
  console.log(`Server is running on port ${envConfig.port}`);
});

// githubService
//   .getCommitDetails({
//     ownerName: "AminGlomopay",
//     repoName: "ai-code-review-test",
//     commitId: "refs/heads/main",
//   })
//   .then((x) => {
//     console.log(x);
//   });
