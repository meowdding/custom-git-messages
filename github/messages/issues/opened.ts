import { GithubMessage } from "../../mod.ts";

//deno-lint-ignore no-explicit-any
export const Opened = (body: any): GithubMessage => {
    const repoName = body.repository.name;
    const issueNumber = body.issue.number;
    const issueTitle = body.issue.title;
    const author = body.issue.user.login;
    const authorAvatar = body.issue.user.avatar_url;
    const authorUrl = body.issue.user.html_url;
    const issueUrl = body.issue.html_url;

    return {
        message: {
            embeds: [
                {
                    title: `Issue #${issueNumber} ${issueTitle} was opened!`,
                    url: issueUrl,
                    author: {
                        name: author,
                        url: authorUrl,
                        icon_url: authorAvatar,
                    },
                },
            ],
        },
        repo: repoName,
    };
};
