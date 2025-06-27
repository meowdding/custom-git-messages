import { Opened } from "./opened.ts";
import { Reopened } from "./reopened.ts";
import { Closed } from "./closed.ts";
import { GitMessage, HandlerList, NoMessage } from "../../../main.ts";

const actions: HandlerList = {
    "opened": Opened,
    "closed": Closed,
    "reopened": Reopened,
};

//deno-lint-ignore no-explicit-any
export const Issue = (body: any): GitMessage => {
    const fn = actions[body.action] || NoMessage;
    return fn(body)
};
