package fr.manegan.fate.model

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter

data class Connection (val sseEmitter: SseEmitter, val roomId: Int)