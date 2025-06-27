import { ServiceMessage } from "../../main.ts";

//deno-lint-ignore no-explicit-any
export const Star = (body: any): ServiceMessage => {
    const action = body.action;
    const added = action === "created";

    const user = body.sender.login;
    const repoName = body.repository.name;
    const starAmount = body.repository.stargazers_count;

    return {
        message: {
            embeds: [
                {
                    title: `1 star was ${
                        added ? "added to" : "removed from"
                    } ${repoName}`,
                    description: `The repository now has ${starAmount} Star${
                        starAmount == 1 ? "" : "s"
                    }! :star:`,
                    author: {
                        name: user,
                        icon_url: body.sender.avatar_url,
                        url: body.sender.html_url,
                    },
                },
            ],
        },
        repo: repoName,
    };
};
