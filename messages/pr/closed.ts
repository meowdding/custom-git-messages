import { GitMessage } from "../../main.ts";
import { postWebhook } from "../../webhooks.ts";

//deno-lint-ignore no-explicit-any
export const Closed = (body: any): GitMessage => {
    const repoName = body.repository.name;
    const prNumber = body.pull_request.number;
    const prTitle = body.pull_request.title;
    const prUrl = body.pull_request.html_url;

    const wasMerged = body.pull_request.merged || false;

    if (wasMerged) {
        return {
            message: {
                embeds: [
                    {
                        title:
                            `Pull request #${prNumber} ${prTitle} was merged!`,
                        url: prUrl,
                    },
                ],
            },
            repo: repoName,
        };
    }

    return {
        message: {
            embeds: [
                {
                    title: `Pull request #${prNumber} ${prTitle} was closed!`,
                    url: prUrl,
                },
            ],
        },
        repo: repoName,
    };
};
