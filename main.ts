import { WebhookMessage } from "https://deno.land/x/dishooks@v1.1.0/types.ts";
import { postWebhook } from "./webhooks.ts";
import { Github } from "./github/mod.ts";

const handlers: ServiceList = {
  github: Github,
};

// deno-lint-ignore no-unused-vars no-explicit-any
export const NoMessage = (body: any): undefined => {
  return;
};

export type ServiceMessage = WebhookMessage | undefined;

export type ServiceResponse =
  | {
      message: WebhookMessage;
      isRedelivered: boolean;
      isDownload: boolean;
    }
  | undefined;

type ServiceList = {
  // deno-lint-ignore no-explicit-any
  [route: string]: (
    body: any,
    request: any,
  ) => Promise<ServiceResponse> | Promise<ServiceResponse[] | undefined>;
};

// deno-lint-ignore no-explicit-any
export type HandlerList<T> = {
  [route: string]: ((body: any) => T)[] | ((body: any) => T);
};
export const kv = await Deno.openKv();

// TODO:x
// - build failure on master
// - changes +/- on commit
Deno.serve(
  async (request) => {
    if (!request.url.endsWith("/" + Deno.env.get("secret") || "meow")) {
      return new Response("{}", { status: 401 });
    } else if (request.method != "POST") {
      return new Response("{}", { status: 405 });
    }

    const body = await request.json();

    const service =
      URL.parse(request.url)?.pathname.substring(1).split("/")[0] || "";

    const fun = handlers[service] || NoMessage;

    const serviceMessages = await fun(body, request);
    console.log("Service Messages:", serviceMessages);
    if (!serviceMessages)
      return new Response(`{"_":"no_message"}`, { status: 200 });
    let messages = Array.isArray(serviceMessages)
      ? serviceMessages
      : [serviceMessages];
    console.log("Messages:", messages);
    for (let message of messages) {
      console.log("posting ", message);
      if (!message) continue;
      await postWebhook(
        message.message,
        message.isRedelivered,
        message.isDownload,
      );
    }

    return new Response("{}", { status: 200 });
  },
  {
    port: 8000,
  },
);
