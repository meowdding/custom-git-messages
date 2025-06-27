import { ServiceMessage } from "../../../main.ts";

//deno-lint-ignore no-explicit-any
export const Reopened = (body: any): ServiceMessage => {
    const repoName = body.repository.name;
    const prNumber = body.pull_request.number;
    const prTitle = body.pull_request.title;
    const prUrl = body.pull_request.html_url;

    return {
        message: {
            embeds: [
                {
                    title: `Pull request #${prNumber} ${prTitle} was reopened!`,
                    url: prUrl,
                },
            ],
        },
        repo: repoName,
    };
};
