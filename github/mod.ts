import { GitMessage, HandlerList, kv, NoMessage, ServiceResponse } from "../main.ts";
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

const actions: HandlerList = {
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

//deno-lint-ignore no-explicit-any
export const Github = async (body: any, request: any): Promise<ServiceResponse> => {
    const eventType = request.headers.get("X-GitHub-Event") || "";
    const eventId = request.headers.get("X-GitHub-Delivery") || "";

    const respond = kv.get(["ids", eventId]);
    const isRedelivered = (await respond).value != null;
    kv.set(["ids", eventId], "meow", { expireIn: 3 * 24 * 60 * 60 * 1000 });
    const fn = actions[eventType] || NoMessage;
    return {
        message: fn(body),
        isRedelivered: isRedelivered
    }
};
