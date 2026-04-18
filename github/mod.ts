import { HandlerList, kv, NoMessage, ServiceResponse } from "../main.ts";
import { Action } from "./messages/action.ts";
import { Deployment } from "./messages/deployment.ts";
import { IssueComment } from "./messages/issues/comments/mod.ts";
import { Issue } from "./messages/issues/mod.ts";
import { PullRequestReview } from "./messages/pr/review/mod.ts";
import { PullRequest } from "./messages/pr/mod.ts";
import { PullRequestReviewComment } from "./messages/pr/review_comment/mod.ts";
import { Push } from "./messages/push.ts";
import { Star } from "./messages/stars.ts";
import { Fork } from "./messages/fork.ts";
import { projects } from "./projects.ts";
import { WebhookMessage } from "https://deno.land/x/dishooks@v1.1.0/types.ts";
import { Create } from "./messages/create.ts";
import { Workflow } from "./messages/workflow.ts";

const actions: HandlerList<
  Promise<GithubMessage | undefined> | (GithubMessage | undefined)
> = {
  fork: Fork,
  push: Push,
  star: Star,
  create: Create,
  issues: Issue,
  issue_comment: IssueComment,
  pull_request: PullRequest,
  pull_request_review: PullRequestReview,
  pull_request_review_comment: PullRequestReviewComment,
  deployment_status: Deployment,
  workflow_run: [Action, Workflow],
};

export type GithubMessage = {
  message: WebhookMessage;
  repo: string;
  type?: "log" | "download";
};

export const Github = async (
  //deno-lint-ignore no-explicit-any
  body: any,
  //deno-lint-ignore no-explicit-any
  request: any,
): Promise<ServiceResponse[] | undefined> => {
  const eventType = request.headers.get("X-GitHub-Event") || "";
  const eventId = request.headers.get("X-GitHub-Delivery") || "";

  const respond = kv.get(["ids", eventId]);
  const isRedelivered = (await respond).value != null;
  kv.set(["ids", eventId], "meow", { expireIn: 3 * 24 * 60 * 60 * 1000 });
  const fn = actions[eventType] || NoMessage;
  console.log(eventType);

  let functions = Array.isArray(fn) ? fn : [fn];

  let messages: ServiceResponse[] = [];

  console.log(functions);
  for (const fn of functions) {
    const message = await fn(body);
    const repo = message?.repo?.toLowerCase();
    console.log(`${repo} -> ${repo ? projects[repo] : "undefined"}`);
    console.log(`${message}`);
    if (!message || !repo || !projects[repo]) return;

    const color = projects[repo] || 0;
    const webhookMessage = message.message;

    webhookMessage.embeds?.forEach((embed) => {
      embed.color = color;
      embed.footer = {
        text: `Repo: ${message.repo}`,
      };
    });
    webhookMessage.username = `GitHub - ${projects[repo].abbreviations || repo}`;

    messages.push({
      message: webhookMessage,
      isRedelivered: isRedelivered,
      isDownload: message.type === "download",
    });
  }

  return messages;
};
