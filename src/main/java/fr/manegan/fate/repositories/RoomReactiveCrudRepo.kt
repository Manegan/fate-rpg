package fr.manegan.fate.repositories

import fr.manegan.fate.model.Room
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
interface RoomReactiveCrudRepo : ReactiveMongoRepository<Room, ObjectId> {

    @Query("{roomId: ?0}")
    fun findByRoomId(roomId: Int): Mono<Room>
}