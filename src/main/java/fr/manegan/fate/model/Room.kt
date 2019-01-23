package fr.manegan.fate.model

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document(collection = "room")
data class Room (
        @Id
        var id: ObjectId,

        var roomId: Int,

        var messages: List<String>
) { constructor(roomId: Int, messages: List<String>): this(ObjectId.get(), roomId, messages) }