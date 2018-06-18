package fr.manegan.fate

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.web.reactive.HandlerMapping
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.*
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter

@SpringBootApplication
class WsServiceApplication

fun main(args: Array<String>) {
    SpringApplication.run(WsServiceApplication::class.java, *args)
}

@Configuration
class WebSocketConfiguration {

    @Bean
    fun routes() : RouterFunction<ServerResponse> {
        return RouterFunctions.route(
                RequestPredicates.GET("/"),
                HandlerFunction { request -> ServerResponse.ok().body(BodyInserters.fromResource(ClassPathResource("static/index.html"))) }
        )
    }

    @Bean
    fun wsha () = WebSocketHandlerAdapter()

    @Bean
    fun hm (): HandlerMapping {
        val suhm = SimpleUrlHandlerMapping()
        suhm.order = 10
        suhm.urlMap = mapOf("/ws/files" to wsha())
        return suhm
    }
}