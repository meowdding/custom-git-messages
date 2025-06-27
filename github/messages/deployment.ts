import { GitMessage } from "../../main.ts";

//deno-lint-ignore no-explicit-any
export const Deployment = (body: any): GitMessage | undefined => {
    if (body.action !== "created") {
        return;
    }
    if (body.deployment.environment !== "Production") {
        return;
    }
    if (body.deployment_status.state !== "failure") {
        return;
    }

    const repoName = body.repository.name;

    return {
        message: {
            embeds: [
                {
                    title: `Production deployment failed!`,
                    url: body.repository.html_url,
                },
            ],
        },
        repo: repoName,
    };
};
