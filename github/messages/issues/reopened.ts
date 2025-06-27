import { ServiceMessage } from "../../../main.ts";

//deno-lint-ignore no-explicit-any
export const Reopened = (body: any): ServiceMessage => {
    const repoName = body.repository.name;
    const issueNumber = body.issue.number;
    const issueTitle = body.issue.title;
    const issueUrl = body.issue.html_url;

    return {
        message: {
            embeds: [
                {
                    title: `Issue #${issueNumber} ${issueTitle} was reopened!`,
                    url: issueUrl,
                },
            ],
        },
        repo: repoName,
    };
};
