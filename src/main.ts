import * as core from "@actions/core";
import * as github from "@actions/github";
import { IssuesEvent } from "@octokit/webhooks-definitions/schema";

async function run() {
  if (
    github.context.eventName !== "issues" ||
    (github.context.payload as IssuesEvent).action !== "opened"
  ) {
    throw new Error("This event can only be used issue open events");
  }

  const octokit = github.getOctokit(core.getInput("token"));

  await octokit.rest.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: github.context.issue.number,
    body: "![works on my machine](https://raw.githubusercontent.com/vivisrc/works-on-my-machine/main/works.png)",
  });

  if (core.getBooleanInput("close")) {
    await octokit.rest.issues.update({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: github.context.issue.number,
      state: "closed",
    });
  }
}

run().catch((error) => core.setFailed(error));
