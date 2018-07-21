package fr.manegan.fate.repositories

import fr.manegan.fate.model.Message
import fr.manegan.fate.model.Room
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Flux

interface RoomReactiveCrudRepo : ReactiveMongoRepository<Room, Int> {

    @Query(value = "{'roomId' : ?0}", fields = "{'messages' : 1, 'id': 0}")
    fun findMessagesById(roomId: Int): Flux<Message>
}