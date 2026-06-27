import { post, WebhookMessage } from "https://deno.land/x/dishooks@v1.1.0/mod.ts";
import { ServiceResponse } from "./main.ts";

const debugUrl = Deno.env.get("debug_webhook_url"); // used for redelivered events
const prodUrl = Deno.env.get("webhook_url");
const downloadUrl = Deno.env.get("download_webhook_url");
const downloadForumUrl = Deno.env.get("download_forum_url");

export async function postWebhook(message: ServiceResponse) {
  if (!message) {
    console.log("Not sending, message undefined!");
    return;
  }
  let url;

  if (message.isRedelivered) {
    url = debugUrl;
  } else if (message.isDownload && message.forum_thread) {
    url = `${downloadUrl}?thread_id=${message.forum_thread}`;
  } else {
    url = prodUrl;
  }
  console.log("posting to", url);
  await post(url || debugUrl, message.message, true);
}
