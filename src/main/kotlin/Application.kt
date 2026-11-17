package me.owdding

import io.ktor.server.application.Application

fun Application.rootModule() {
    configureMonitoring()
    configureSerialization()
    configureRouting()
}
