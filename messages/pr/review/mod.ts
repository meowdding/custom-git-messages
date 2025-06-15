import { GitMessage, HandlerList, NoMessage } from "../../../main.ts";
import { Submitted } from "./submitted.ts";

const actions: HandlerList = {
    "submitted": Submitted,
};

//deno-lint-ignore no-explicit-any
export const PullRequestReview = (body: any): GitMessage => {
    const fn = actions[body.action] || NoMessage;
    return fn(body)
};
