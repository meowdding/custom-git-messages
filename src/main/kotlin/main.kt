package me.owdding

import dev.kord.rest.service.RestClient
import io.ktor.server.application.Application
import io.ktor.server.engine.embeddedServer

object CustomGitMessages {
    val kord = RestClient("")
    val startTime = System.currentTimeMillis()

    @JvmStatic
    fun main(args: Array<String>) {
        embeddedServer(
            factory = io.ktor.server.netty.Netty,
            port = 8080,
            host = "0.0.0.0",
            module = Application::rootModule
        ).start(wait = true)
    }

}
