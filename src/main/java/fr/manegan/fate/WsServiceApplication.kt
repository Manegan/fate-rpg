package fr.manegan.fate

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories
import org.springframework.web.reactive.function.BodyInserters.fromResource
import org.springframework.web.reactive.function.server.HandlerFunction
import org.springframework.web.reactive.function.server.RequestPredicates.GET
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.RouterFunctions
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.ServerResponse.ok

@SpringBootApplication
class WsServiceApplication

fun main(args: Array<String>) {
    SpringApplication.run(WsServiceApplication::class.java, *args)
}

@Configuration
@EnableReactiveMongoRepositories
class FateRPGConfiguration: AbstractReactiveMongoConfiguration() {
    override fun getDatabaseName(): String = "test"

    override fun reactiveMongoClient(): MongoClient = MongoClients.create()

    override fun getMappingBasePackages(): MutableCollection<String> {
        val list: MutableCollection<String> = MutableList(0, { index -> index.toString() })
        list.add("fr.manegan.fate.repositories")
        return list
    }

    @Bean
    fun routes(): RouterFunction<ServerResponse> =
            RouterFunctions.route(
                GET("/"),
                HandlerFunction { request -> ok().body(fromResource(ClassPathResource("/static/index.html"))) }
            )
}