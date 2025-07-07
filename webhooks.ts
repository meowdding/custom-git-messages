import {
    post,
    WebhookMessage,
} from "https://deno.land/x/dishooks@v1.1.0/mod.ts";

const debugUrl = Deno.env.get("debug_webhook_url"); // used for redelivered events
const prodUrl = Deno.env.get("webhook_url");

export function postWebhook(
    message: WebhookMessage,
    isRedelivered: boolean,
) {
    if (isRedelivered || !prodUrl) {
        if (debugUrl) {
            post(debugUrl, message, true);
        }
    } else {
        post(prodUrl, message, true);
    }
}
 
