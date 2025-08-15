import { GithubMessage } from "../mod.ts";

const types: { [key: string]: string } = {
    "tag": " Tag",
};

//deno-lint-ignore no-explicit-any
export const Create = (body: any): (GithubMessage | undefined) => {
    const type = types[body.ref_type] 

    if (type == undefined) return

    const user = body.sender.login;
    const repoName = body.repository.name;

    return {
        message: {
            embeds: [
                {
                    title: `${type} ${body.ref} was created!`,
                    url: body.repository.html_url,
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
