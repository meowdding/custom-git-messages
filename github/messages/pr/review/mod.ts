import { HandlerList, NoMessage } from "../../../../main.ts";
import { GithubMessage } from "../../../mod.ts";
import { Submitted } from "./submitted.ts";

const actions: HandlerList<GithubMessage | undefined> = {
    "submitted": Submitted,
};

//deno-lint-ignore no-explicit-any
export const PullRequestReview = (body: any): GithubMessage | undefined => {
    const fn = actions[body.action] || NoMessage;
    return fn(body)
};
