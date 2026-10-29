import { HandlerList, NoMessage, ServiceResponse } from "../main.ts";
import { WebhookMessage } from "https://deno.land/x/dishooks@v1.1.0/types.ts";
import { Component } from "./repository_component.ts";
import { mappings } from "./compoent_mappings.ts";

const actions: HandlerList<Promise<NexusMessage | undefined> | (NexusMessage | undefined)> = {
  "rm:repository:component": Component,
};
export type NexusMessage = {
  message: WebhookMessage;
  component: string;
};

export const Nexus = async (
  //deno-lint-ignore no-explicit-any
  body: any,
  //deno-lint-ignore no-explicit-any
  request: any,
): Promise<ServiceResponse[] | undefined> => {
  console.log("nexus: data", body, request);
  const eventType = request.headers.get("x-nexus-webhook-id") || "";

  console.log("nexus: handling event", eventType);

  const fn = actions[eventType] || NoMessage;

  let functions = Array.isArray(fn) ? fn : [fn];

  let messages: ServiceResponse[] = [];

  console.log("nexus: eventType =", eventType, ", functions =", functions);
  for (const fn of functions) {
    const message = await fn(body);
    const repo = message?.component?.toLowerCase();
    if (!message || !repo || !mappings[repo]) {
      console.log("nexus: skipping message = ", message, ", component = ", repo, ", mapping = ", mappings[repo || ""]);
      continue;
    }

    const color = mappings[repo].color || 0;
    const webhookMessage = message.message;

    //deno-lint-ignore no-explicit-any
    webhookMessage.embeds?.forEach((embed: any) => {
      embed.color = color;
      embed.footer = {
        text: `Component: ${message.component}`,
      };
    });
    webhookMessage.username = `Nexus - ${mappings[repo].abbreviations || repo}`;

    messages.push({
      message: webhookMessage,
      isRedelivered: false,
      isDownload: false,
      forum_thread: undefined,
    });
  }

  return messages;
};
