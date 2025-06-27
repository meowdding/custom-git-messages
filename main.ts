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

export type ServiceMessage = WebhookMessage | undefined;

export type ServiceResponse = {
    message: WebhookMessage;
    isRedelivered: boolean;
} | undefined;

type ServiceList = {
    // deno-lint-ignore no-explicit-any
    [route: string]: (body: any, request: any) => Promise<ServiceResponse>;
};

// deno-lint-ignore no-explicit-any
export type HandlerList<T> = { [route: string]: (body: any) => T };
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

    const body = await request.json();

    const service =
        URL.parse(request.url)?.pathname.substring(1).split("/")[0] || "";

    const fun = handlers[service] || NoMessage;
    const serviceMessage = await fun(body, request);

    if (serviceMessage) {
        postWebhook(serviceMessage.message, serviceMessage.isRedelivered);
    }

    return new Response("{}", { status: 200 });
}, {
    port: 8000,
});
