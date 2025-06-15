import {
    post,
    WebhookMessage,
} from "https://deno.land/x/dishooks@v1.1.0/mod.ts";
import { abbreviations, colors } from "./projects.ts";

const debugUrl = Deno.env.get("debug_webhook_url") // used for redelivered events
const prodUrl = Deno.env.get("webhook_url")

export function postWebhook(
    message: WebhookMessage,
    project: string,
    isRedelivered: boolean,
) {
    const actualProject = project.toLowerCase();
    if (!colors[actualProject]) {
        console.log("no color found for " + actualProject);
        return;
    }

    message.embeds?.forEach((embed) => {
        if (project && colors[actualProject]) {
            embed.color = colors[actualProject];
        }
        embed.footer = {
            text: `Repo: ${actualProject}`,
        };
    });
    message.username = `GitHub - ${abbreviations[actualProject]}`;
    if (isRedelivered || !prodUrl) {
        post(debugUrl, message, true);
    } else {
        post(prodUrl, message, true)
    }
}
