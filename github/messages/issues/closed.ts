import { GithubMessage } from "../../mod.ts";

const types: { [key: string]: string } = {
    "not_planned": " as Not Planned",
    "completed": " as Completed",
    "duplicate": " as Duplicate",
};

//deno-lint-ignore no-explicit-any
export const Closed = (body: any): GithubMessage => {
    const repoName = body.repository.name;
    const issueNumber = body.issue.number;
    const issueTitle = body.issue.title;
    const issueUrl = body.issue.html_url;
    const closedReason = body.issue.state_reason;

    return {
        message: {
            embeds: [
                {
                    title:
                        `Issue #${issueNumber} ${issueTitle} was closed${(types[
                            closedReason
                        ] || "")}!`,
                    url: issueUrl,
                },
            ],
        },
        repo: repoName,
    };
};
