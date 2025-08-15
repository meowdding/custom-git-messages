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
import { abbreviations, colors } from "./projects.ts";
import { WebhookMessage } from "https://deno.land/x/dishooks@v1.1.0/types.ts";
import { Create } from "./messages/create.ts";

const actions: HandlerList<Promise<GithubMessage | undefined> | (GithubMessage | undefined)> = {
    "fork": Fork,
    "push": Push,
    "star": Star,
    "create": Create,
    "issues": Issue,
    "issue_comment": IssueComment,
    "pull_request": PullRequest,
    "pull_request_review": PullRequestReview,
    "pull_request_review_comment": PullRequestReviewComment,
    "deployment_status": Deployment,
    "workflow_run": Action,
};

export type GithubMessage = {
    message: WebhookMessage;
    repo: string;
};

export const Github = async (
    //deno-lint-ignore no-explicit-any
    body: any,
    //deno-lint-ignore no-explicit-any
    request: any,
): Promise<ServiceResponse> => {
    const eventType = request.headers.get("X-GitHub-Event") || "";
    const eventId = request.headers.get("X-GitHub-Delivery") || "";

    const respond = kv.get(["ids", eventId]);
    const isRedelivered = (await respond).value != null;
    kv.set(["ids", eventId], "meow", { expireIn: 3 * 24 * 60 * 60 * 1000 });
    const fn = actions[eventType] || NoMessage;

    const message = await fn(body);
    const repo = message?.repo?.toLowerCase()
    if (!message || !repo || !colors[repo]) return undefined;

    const color = colors[repo];
    const webhookMessage = message.message;

    webhookMessage.embeds?.forEach((embed) => {
        embed.color = color;
        embed.footer = {
            text: `Repo: ${message.repo}`
        }
    });
    webhookMessage.username = `GitHub - ${
        abbreviations[repo] || repo
    }`;

    return {
        message: webhookMessage,
        isRedelivered: isRedelivered,
    };
};
