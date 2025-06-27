import { truncate } from "../../../../github/utils.ts";
import { GithubMessage } from "../../../mod.ts";

//deno-lint-ignore no-explicit-any
export const Created = (body: any): GithubMessage => {
    const repoName = body.repository.name;
    const message = body.comment.body;
    const issueNumber = body.issue.number;
    const issueTitle = body.issue.title;
    const issueUrl = body.comment.html_url;
    const author = body.comment.user.login;
    const authorAvatar = body.comment.user.avatar_url;
    const authorUrl = body.comment.user.html_url;

    return {
        message: {
            embeds: [
                {
                    title: `Commented on #${issueNumber} ${issueTitle}`,
                    url: issueUrl,
                    description: truncate(`${message}`, 4096),
                    author: {
                        name: author,
                        icon_url: authorAvatar,
                        url: authorUrl,
                    },
                },
            ],
        },
        repo: repoName,
    };
};
