package fr.manegan.fate.controller

import fr.manegan.fate.model.Connection
import fr.manegan.fate.model.Room
import fr.manegan.fate.repositories.RoomReactiveCrudRepo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import reactor.core.publisher.Mono

@Controller("")
@CrossOrigin(origins = ["http://localhost:8090"])
class SseController (val repo: RoomReactiveCrudRepo) {

    val emitters: MutableList<Connection> = ArrayList()

    @PostMapping("/test/{id}")
    fun postMessage(@PathVariable id: Int, @RequestBody msg: String): Mono<Room> {
        return repo.findByRoomId(id).switchIfEmpty(Mono.just(Room(id, emptyList())))
                .doOnSuccess {r -> r.messages = listOf(*r.messages.toTypedArray(), msg) }
                .doOnSuccess { r ->
                    repo.save(r).subscribe { saved ->
                        emitters.filter { co -> co.roomId == id }.forEach { co ->
                            co.sseEmitter.send(saved.messages[saved.messages.lastIndex])
                        }
                    }
                }
    }

    @GetMapping("/test/{id}")
    fun getMessages(@PathVariable id: Int): SseEmitter {
        val sseEmitter = SseEmitter(60 * 1000L)
        val room = repo.findByRoomId(id)
        room.subscribe { r -> r.messages.forEach { msg -> sseEmitter.send(msg) } }
        val conn = Connection(sseEmitter, id)
        if (emitters.filter { co -> co.roomId == id }.isNotEmpty()) {
            emitters.add(conn)
        }
        sseEmitter.onTimeout { emitters.remove(conn) }
        sseEmitter.onError { emitters.remove(conn) }
        return sseEmitter
    }
}