package fr.manegan.fate.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document(collection = "room")
data class Room (
        @Id
        var id: UUID,

        var roomId: Int,

        var messages: List<Message>
)