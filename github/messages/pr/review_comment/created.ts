import { GitMessage } from "../../../../main.ts";
import { truncate } from "../../../../github/utils.ts";

//deno-lint-ignore no-explicit-any
export const Created = (body: any): GitMessage => {
    const repoName = body.repository.name;
    const prNumber = body.pull_request.number;
    const prTitle = body.pull_request.title;
    const prUrl = body.comment.html_url;
    const author = body.comment.user.login;
    const authorAvatar = body.comment.user.avatar_url;
    const authorUrl = body.comment.user.html_url;

    return {
        message: {
            embeds: [
                {
                    title: `Commented on #${prNumber} ${prTitle}`,
                    description: truncate(body.comment.body, 4096),
                    url: prUrl,
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
