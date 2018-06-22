package fr.manegan.fate

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.*
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer

@SpringBootApplication
class WsServiceApplication

fun main(args: Array<String>) {
    SpringApplication.run(WsServiceApplication::class.java, *args)
}

@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfiguration : WebSocketMessageBrokerConfigurer {
    @Bean
    fun routes(): RouterFunction<ServerResponse> {
        return RouterFunctions.route(
                RequestPredicates.GET("/"),
                HandlerFunction { request -> ServerResponse.ok().body(BodyInserters.fromResource(ClassPathResource("/static/index.html"))) }
        )
    }

    override fun registerStompEndpoints(registry: StompEndpointRegistry?) {
        registry!!.addEndpoint("/portfolio").withSockJS()
    }

    override fun configureMessageBroker(registry: MessageBrokerRegistry?) {
        registry!!.setApplicationDestinationPrefixes("/app")
        registry.enableSimpleBroker("/topic")
    }
}