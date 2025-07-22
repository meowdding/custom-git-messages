import { Opened } from "./opened.ts";
import { Closed } from "./closed.ts";
import { Reopened } from "./reopened.ts";
import { HandlerList, NoMessage } from "../../../main.ts";
import { GithubMessage } from "../../mod.ts";
import { Drafted } from "./converted_to_draft.ts";
import { Undrafted } from "./ready_for_review.ts";

const actions: HandlerList<GithubMessage | undefined> = {
    "opened": Opened,
    "closed": Closed,
    "reopened": Reopened,
    "converted_to_draft": Drafted,
    "ready_for_review": Undrafted,
};

//deno-lint-ignore no-explicit-any
export const PullRequest = (body: any): GithubMessage | undefined => {
    const fn = actions[body.action] || NoMessage;
    return fn(body)
};
