package fr.manegan.fate.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.stereotype.Controller

@Controller
class GreetingController {
    @MessageMapping("/greeting")
    fun handle(greeting: String): String {
        return greeting
    }
}