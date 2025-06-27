import { ServiceMessage, HandlerList, NoMessage } from "../../../../main.ts";
import { Created } from "./created.ts";

const actions: HandlerList = {
    "created": Created,
};

//deno-lint-ignore no-explicit-any
export const PullRequestReviewComment = (body: any): ServiceMessage => {
    const fn = actions[body.action] || NoMessage;
    return fn(body)
};
