package me.owdding

import dev.kord.common.entity.Snowflake
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.Properties
import kotlin.io.path.Path
import kotlin.io.path.exists
import kotlin.io.path.reader

data object Env : Logger by LoggerFactory.getLogger(Env::class.java) {

    val envFileContent = Properties()
    init {
        Path(".env").takeIf { it.exists() }?.apply {
            envFileContent.load(this.reader())
        }
    }

    fun require(name: String) = System.getenv(name) ?: envFileContent[name]?.toString() ?: throw IllegalStateException("Missing env entry for '$name'")

    val REDIS: String? = System.getenv("redis_host")

    @Serializable
    data class Webhook(val snowflake: Snowflake, val token: String)

    fun load() {
        info("Redis: $REDIS")
    }
}