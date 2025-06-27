import { HandlerList, kv, NoMessage, ServiceResponse } from "../main.ts";
import { WebhookMessage } from "https://deno.land/x/dishooks@v1.1.0/types.ts";

export type GithubMessage = {
    message: WebhookMessage;
    repo: string;
};

const allowedRepositories = [
    "thatgravyboat",
];

const groupArtifactRegex: { [route: string]: string | boolean } = {
    "tech.thatgravyboat": "Skyblock-api.*|repo-lib",
    "me.owdding": true,
};

enum actions {
    CREATED = "CREATED",
    DELETED = "DELETED",
    UPDATED = "UPDATED",
}

type request = {
    timestamp: string;
    nodeId: string;
    initiator: string;
    repositoryName: string;
    action: actions;
    component: Component;
};

type Component = mavenComponent;

enum componentFormat {
    MAVEN = "maven2",
}

interface baseComponent {
    id: string;
    componentId: string;
    format: componentFormat;
}

interface mavenComponent extends baseComponent {
    format: componentFormat.MAVEN;
    name: string;
    group: string;
    version: string;
}

export const Nexus = (
    //deno-lint-ignore no-explicit-any
    _body: any,
    //deno-lint-ignore no-explicit-any
    _request: any,
): ServiceResponse | undefined => {
    const body: request = _body;

    if (body.action != actions.CREATED) return;
    if (!(body.repositoryName in allowedRepositories)) return;

    switch (body.component.format) {
        case componentFormat.MAVEN: {
            if (!groupArtifactRegex[body.component.group]) return;
            const condition = groupArtifactRegex[body.component.group];

            if (typeof condition === "string") {
                if (!RegExp(condition).test(body.component.name)) return;
            } else if (typeof condition === "boolean" && condition !== true) {
                return
            } else {
                return
            }

            return {
                message: {
                    embeds: [
                        {
                            title: "New Artifact!",
                            description: `
                            todo but \`${body.component.group}:${body.component.name}:${body.component.version}\`
                            `,
                        },
                    ],
                    username: "Nexus",
                },
                isRedelivered: false,
            };
        }
    }
};
