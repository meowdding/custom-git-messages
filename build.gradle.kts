
plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.ksp)
    alias(ktorLibs.plugins.ktor)
    alias(libs.plugins.kotlin.serialization)
}

group = "me.owdding"
version = "1.0.0-SNAPSHOT"

application {
    mainClass = "me.owdding.CustomGitMessages"
}

kotlin {
    jvmToolchain(21)
}

repositories {
    mavenCentral()
    maven("https://maven.teamresourceful.com/repository/maven-public/") { content { includeGroupAndSubgroups("me.owdding") } }
    maven("https://maven-github.mona.cat/kordlib/kord/") { content { includeGroupAndSubgroups("dev.kord") } }
}

ksp {
    arg("meowdding.modules.project_name", "CustomGitMessages")
    arg("meowdding.modules.package", "me.owdding.generated")
}

dependencies {
    implementation(ktorLibs.serialization.kotlinx.json)
    implementation(ktorLibs.server.contentNegotiation)
    implementation(ktorLibs.server.core)
    implementation(ktorLibs.server.metrics.micrometer)
    implementation(ktorLibs.server.netty)
    implementation(libs.logback.classic)
    implementation(libs.micrometer.registryPrometheus)
    implementation(libs.kord.rest)
    implementation(libs.kedis)
    ksp(libs.modules) {
        implementation(this)
    }
    implementation(libs.kt.serialization.json)


    testImplementation(kotlin("test"))
    testImplementation(ktorLibs.server.testHost)
}
