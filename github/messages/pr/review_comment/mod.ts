import { HandlerList, NoMessage } from "../../../../main.ts";
import { GithubMessage } from "../../../mod.ts";
import { Created } from "./created.ts";

const actions: HandlerList<GithubMessage | undefined> = {
    "created": Created,
};

//deno-lint-ignore no-explicit-any
export const PullRequestReviewComment = (body: any): GithubMessage | undefined => {
    const fn = actions[body.action] || NoMessage;
    return fn(body)
};
