import { GitMessage } from "../../main.ts";

//deno-lint-ignore no-explicit-any
export const Fork = (body: any): GitMessage => {
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
