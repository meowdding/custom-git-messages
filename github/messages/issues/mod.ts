import { Opened } from "./opened.ts";
import { Reopened } from "./reopened.ts";
import { Closed } from "./closed.ts";
import { HandlerList, NoMessage } from "../../../main.ts";
import { GithubMessage } from "../../mod.ts";

const actions: HandlerList<GithubMessage | undefined> = {
    "opened": Opened,
    "closed": Closed,
    "reopened": Reopened,
};

//deno-lint-ignore no-explicit-any
export const Issue = (body: any): GithubMessage | undefined => {
    const fn = actions[body.action] || NoMessage;
    return fn(body);
};
