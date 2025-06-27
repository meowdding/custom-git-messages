import { Opened } from "./opened.ts";
import { Closed } from "./closed.ts";
import { Reopened } from "./reopened.ts";
import { ServiceMessage, HandlerList, NoMessage } from "../../../main.ts";

const actions: HandlerList = {
    "opened": Opened,
    "closed": Closed,
    "reopened": Reopened
};

//deno-lint-ignore no-explicit-any
export const PullRequest = (body: any): ServiceMessage => {
    const fn = actions[body.action] || NoMessage;
    return fn(body)
};
