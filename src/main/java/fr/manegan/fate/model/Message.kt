package fr.manegan.fate.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document(collection = "message")
data class Message (
        var messageId: UUID?,

        var message: String
) {
        constructor(message: String): this(null, message)
}