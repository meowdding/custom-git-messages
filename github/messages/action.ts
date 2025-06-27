import { ServiceMessage } from "../../main.ts";

//deno-lint-ignore no-explicit-any
export const Action = (body: any): ServiceMessage => {
    if (body.action !== "completed") {
        return;
    }

    const repoName = body.repository.name;

    if (body.repository.default_branch !== body.workflow_run.head_branch) {
        return;
    }

    if (body.workflow_run.conclusion !== "failure") {
        return;
    }

    return {
        message: {
            embeds: [
                {
                    title: `Workflow failed on default branch!`,
                    url: body.workflow_run.html_url,
                },
            ],
        },
        repo: repoName,
    };
};
