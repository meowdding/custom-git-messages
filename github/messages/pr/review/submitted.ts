import { truncate } from "../../../../github/utils.ts";
import { GithubMessage } from "../../../mod.ts";

const types: { [key: string]: string } = {
    "changes_requested": "Requested changes on",
    "approved": "Approved",
};

//deno-lint-ignore no-explicit-any
export const Submitted = (body: any): GithubMessage | undefined => {
    const repoName = body.repository.name;
    const prNumber = body.pull_request.number;
    const prTitle = body.pull_request.title;
    const prUrl = body.review.html_url;
    const author = body.review.user.login;
    const authorAvatar = body.review.user.avatar_url;
    const authorUrl = body.review.user.html_url;

    const state = body.review.state;
    if (state == "commented") {
        return;
    }

    const message = types[body.review.state] || "Has submitted a review for";

    return {
        message: {
            embeds: [
                {
                    title: `${message} #${prNumber} ${prTitle}`,
                    description: truncate(body.review.body, 4096),
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
