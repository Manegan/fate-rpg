package fr.manegan.fate.controller

import fr.manegan.fate.model.Message
import fr.manegan.fate.model.Room
import fr.manegan.fate.repositories.RoomReactiveCrudRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import reactor.core.publisher.Mono

@Controller("/")
@CrossOrigin(origins = ["http://localhost:8090"])
class SseController {

    @Autowired
    lateinit var repo: RoomReactiveCrudRepo

    @PostMapping("/test/{id}")
    fun postMessage(@PathVariable id: Int, @RequestBody msg: String): Mono<Room> {
        return repo.findById(id)
                .doOnSuccess({r -> r.messages = listOf(Message(msg), *r.messages.toTypedArray())})
                .doOnSuccess({r -> repo.save(r)})
    }

    @GetMapping("/test/{id}")
    fun getMessages(@PathVariable id: Int): SseEmitter {
        val sseEmitter = SseEmitter(60 * 1000L)
        var msgsFlux = repo.findMessagesById(id)
        msgsFlux.subscribe({ m -> sseEmitter.send(m) })
//                .subscribe({ msg -> sseEmitter.send(msg) },
//                        sseEmitter::completeWithError,
//                        sseEmitter::complete)
        sseEmitter.send("hello")
        return sseEmitter
    }
}