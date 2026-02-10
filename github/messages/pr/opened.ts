import { truncate } from "../../../github/utils.ts";
import { GithubMessage } from "../../mod.ts";

const orgs = ["meowdding", "skyblockapi"];

//deno-lint-ignore no-explicit-any
function getLabel(ref: any): string {
    if (orgs.includes(ref.user.login.toLowerCase())) {
        return ref.ref;
    }

    return ref.label;
}

//deno-lint-ignore no-explicit-any
export const Opened = (body: any): GithubMessage => {
    const repoName = body.repository.name;
    const prNumber = body.pull_request.number;
    const prTitle = body.pull_request.title;
    const author = body.pull_request.user.login;
    const authorAvatar = body.pull_request.user.avatar_url;
    const authorUrl = body.pull_request.user.html_url;
    const prUrl = body.pull_request.html_url;

    const additions = body.pull_request.additions;
    const deletions = body.pull_request.deletions;

    const head = body.pull_request.head;
    const base = body.pull_request.base;

    const headPath = getLabel(head);
    const basePath = getLabel(base);

    const headUrl = head.repo.html_url;
    const baseUrl = base.repo.html_url;

    const draft = body.pull_request.draft || false;

    const compareUrl = body.repository.html_url + "/compare/" + base.sha +
        "..." + head.sha;

    const prBody: string = body.pull_request.body || "";

    return {
        message: {
            embeds: [
                {
                    title: `${
                        draft ? "Draft " : ""
                    }Pull request #${prNumber} ${prTitle} was opened!`,
                    url: prUrl,
                    description: truncate(
                        `
                    From [${headPath}](${headUrl}) into [${basePath}](${baseUrl}). ([diff](${compareUrl}))
                    
                    ${prBody.trim()}
                    `,
                        4096,
                    ),
                    fields: [
                        {
                            name: "Changes",
                            value: `+${additions.toLocaleString('en-US',{minimumFractionDigits:2})}/-${deletions.toLocaleString('en-US',{minimumFractionDigits:2})}`,
                            inline: true,
                        },
                    ],
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
