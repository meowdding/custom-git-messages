import { GithubMessage } from "../mod.ts";

//deno-lint-ignore no-explicit-any
export const Fork = (body: any): GithubMessage => {
    const forkee = body.forkee;

    const repoName = body.repository.name;

    return {
        message: {
            embeds: [
                {
                    title: `New fork ${forkee.full_name} was created!`,
                    url: forkee.html_url,
                },
            ],
        },
        repo: repoName,
    };
};
