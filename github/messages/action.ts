import { GithubMessage } from "../mod.ts";

const allowedBranches = ["dev", "development"];

//deno-lint-ignore no-explicit-any
export const Action = (body: any): GithubMessage | undefined => {
    if (body.action !== "completed") {
        return;
    }

    const repoName = body.repository.name;
    const headBranch = body.workflow_run.head_branch;
    const defaultBranch = body.repository.default_branch;

    const isAllowedBranch = headBranch === defaultBranch || allowedBranches.includes(headBranch);

    if (!isAllowedBranch) {
        return;
    }

    if (body.workflow_run.conclusion !== "failure") {
        return;
    }

    return {
        message: {
            embeds: [
                {
                    title: `Workflow failed on ${headBranch} branch!`,
                    url: body.workflow_run.html_url
                },
            ],
        },
        repo: repoName,
    };
};
