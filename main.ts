import { serve } from "https://deno.land/std@0.184.0/http/server.ts";
import { Fork } from "./messages/fork.ts";
import { Push } from "./messages/push.ts";
import { Star } from "./messages/stars.ts";
import { Deployment } from "./messages/deployment.ts";
import { PullRequest } from "./messages/pr/mod.ts";
import { PullRequestReview } from "./messages/pr/review/mod.ts";
import { PullRequestReviewComment } from "./messages/pr/review_comment/mod.ts";
import { Issue } from "./messages/issues/mod.ts";
import { IssueComment } from "./messages/issues/comments/mod.ts";
import { createAll } from "./projects.ts";
import { Action } from "./messages/action.ts";
import { WebhookMessage } from "https://deno.land/x/dishooks@v1.1.0/types.ts";
import { postWebhook } from "./webhooks.ts";

const handlers: HandlerList = {
    "fork": Fork,
    "push": Push,
    "star": Star,
    "issues": Issue,
    "issue_comment": IssueComment,
    "pull_request": PullRequest,
    "pull_request_review": PullRequestReview,
    "pull_request_review_comment": PullRequestReviewComment,
    "deployment_status": Deployment,
    "workflow_run": Action,
};

// deno-lint-ignore no-unused-vars no-explicit-any
export const NoMessage = (body: any): undefined => {
    return;
};

interface gitMessage {
    message: WebhookMessage;
    repo: string;
}
export type GitMessage = gitMessage | undefined;
// deno-lint-ignore no-explicit-any
export type HandlerList = { [route: string]: (body: any) => GitMessage };
const kv = await Deno.openKv();

// TODO:x
// - build failure on master
// - changes +/- on commit
serve(async (request) => {
    if (request.headers.get("balls")) {
        createAll();
    }

    const body = await request.json();
    const eventType = request.headers.get("X-GitHub-Event") || "";
    const eventId = request.headers.get("X-GitHub-Delivery") || "";

    const respond = kv.get(["ids", eventId]);
    const isRedelivered = (await respond).value != null
    kv.set(["ids", eventId], "meow", { expireIn: 3 * 24 * 60 * 60 * 1000})

    const fun = handlers[eventType] || NoMessage;
    const message = fun(body);

    if (message) {
        postWebhook(message.message, message.repo, isRedelivered);
    }

    return new Response("{}", { status: 200 });
}, {
    port: 8000,
});
