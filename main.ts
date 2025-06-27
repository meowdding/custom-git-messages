import { serve } from "https://deno.land/std@0.184.0/http/server.ts";
import { WebhookMessage } from "https://deno.land/x/dishooks@v1.1.0/types.ts";
import { postWebhook } from "./webhooks.ts";
import { Github } from "./github/mod.ts";

const handlers: ServiceList = {
    "github": Github,
};

// deno-lint-ignore no-unused-vars no-explicit-any
export const NoMessage = (body: any): undefined => {
    return;
};

interface gitMessage {
    message: WebhookMessage;
    repo: string | undefined;
}
export type ServiceMessage = gitMessage | undefined;

export type ServiceResponse = {
    message: ServiceMessage,
    name: string,
    isRedelivered: boolean 
} 

// deno-lint-ignore no-explicit-any
type ServiceList = { [route: string]: (body: any, request: any) => Promise<ServiceResponse> };

// deno-lint-ignore no-explicit-any
export type HandlerList = { [route: string]: (body: any) => ServiceMessage };
export const kv = await Deno.openKv();

// TODO:x
// - build failure on master
// - changes +/- on commit
serve(async (request) => {
    if (!request.url.endsWith("/" + Deno.env.get("secret") || "meow")) {
        return new Response("{}", { status: 401 });
    } else if (request.method != "POST") {
        return new Response("{}", { status: 405 });
    }
    console.log(request)

    const body = await request.json();

    const service = URL.parse(request.url)?.pathname.substring(1).split("/")[0] || ""

    const fun = handlers[service] || NoMessage;
    const response = await fun(body, request);

    if (response.message) {
        postWebhook(response.message.message, response.name, response.message.repo, response.isRedelivered);
    }

    return new Response("{}", { status: 200 });
}, {
    port: 8000,
});
