import {
  post,
  WebhookMessage,
} from "https://deno.land/x/dishooks@v1.1.0/mod.ts";

const debugUrl = Deno.env.get("debug_webhook_url"); // used for redelivered events
const prodUrl = Deno.env.get("webhook_url");
const downloadUrl = Deno.env.get("download_webhook_url");

export async function postWebhook(
  message: WebhookMessage,
  isRedelivered: boolean,
  isDownload: boolean,
) {
  let url;

  if (isRedelivered) {
    url = debugUrl;
  } else if (isDownload) {
    url = downloadUrl;
  } else {
    url = prodUrl;
  }
  console.log("posting to ", url);
  await post(url || debugUrl, message, true);
}
