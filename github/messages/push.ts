import { GithubMessage } from "../mod.ts";

//deno-lint-ignore no-explicit-any
function buildDescription(commits: any[]): string {
    let message = "";
    if (commits.length == 1) {
        message += "1 commit was added";
    } else {
        message += `${commits.length} commits were added`;
    }
    message += "\n\n";
    commits.forEach((commit) => {
        message += `${commit.message.split("\n")[0]} ([${
            commit.id.substring(0, 5)
        }](${commit.url})) by [${commit.author.name}](https://github.com/${commit.author.username})`;
        message += "\n";
    });

    return message;
}

//deno-lint-ignore no-explicit-any
export const Push = (body: any): GithubMessage | undefined => {
    const ref = body.ref;

    if (`refs/heads/${body.repository.default_branch}` !== ref) {
        return;
    }

    const committer = body.head_commit.committer.name;
    const repoName = body.repository.name;
    const url = body.compare;

    if (
        committer === "GitHub" &&
        body.head_commit.committer.email === "noreply@github.com"
    ) {
        return;
    }

    body.commits.forEach((x: { message: string | string[]; }) => {
        if (x.message.includes("[nolog]")) {
            return;
        }
    })
    
    return {
        message: {
            embeds: [
                {
                    url: url,
                    title: `${committer} committed to ${repoName}`,
                    description: buildDescription(body.commits),
                },
            ],
        },
        repo: repoName,
    };
};
