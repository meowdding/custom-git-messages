package me.owdding

import dev.kord.common.entity.Snowflake
import dev.kord.rest.builder.message.create.WebhookMessageCreateBuilder
import dev.kord.rest.builder.message.modify.WebhookMessageModifyBuilder
import org.slf4j.Logger
import org.slf4j.LoggerFactory

data object Webhooks : Logger by LoggerFactory.getLogger(Webhooks::class.java) {
    suspend fun sendMessage(webhook: Env.Webhook, withComponents: Boolean = false, builder: WebhookMessageCreateBuilder.() -> Unit) {
        CustomGitMessages.kord.webhook.executeWebhook(
            webhook.snowflake, webhook.token, withComponents = withComponents
        ) {
            builder()
        }
    }

    suspend fun editMessage(webhook: Env.Webhook, message: Snowflake, builder: WebhookMessageModifyBuilder.() -> Unit) {
        CustomGitMessages.kord.webhook.editWebhookMessage(
            webhook.snowflake, webhook.token, message
        ) {
            builder()
        }
    }

}