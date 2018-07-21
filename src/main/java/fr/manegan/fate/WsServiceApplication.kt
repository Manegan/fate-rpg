package fr.manegan.fate

import com.mongodb.MongoClient
import fr.manegan.fate.repositories.RoomReactiveCrudRepo
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.data.mongodb.config.AbstractMongoConfiguration
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.*

@SpringBootApplication
@EnableMongoRepositories
class WsServiceApplication

fun main(args: Array<String>) {
    SpringApplication.run(WsServiceApplication::class.java, *args)
}

@Configuration
@EnableMongoRepositories
class FateRPGConfiguration: AbstractMongoConfiguration() {
    override fun getDatabaseName(): String {
        return "fate-store"
    }

    override fun mongoClient(): MongoClient {
        return MongoClient()
    }

    override fun getMappingBasePackages(): MutableCollection<String> {
        var list: MutableCollection<String> = MutableList(0, { index -> index.toString() })
        list.add("fr.manegan.fate.repositories")
        return list
    }

    @Bean
    fun routes(): RouterFunction<ServerResponse> {
        return RouterFunctions.route(
                RequestPredicates.GET("/"),
                HandlerFunction { request -> ServerResponse.ok().body(BodyInserters.fromResource(ClassPathResource("/static/index.html"))) }
        )
    }
}