import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_SEND,
    CHAT_MESSAGE
} from '../constants/ActionTypes'

const eventToActionAdapters = {
    CHAT_MESSAGE: ({payload}) =>
    ({type: CHAT_MESSAGE, payload}),
    USER_STATS: ({payload}) => ({type: USER_STATS, payload}),
    USER_LEFT: ({payload}) => ({type: USER_LEFT, payload})
}

export function connectToFateServer(url) {
    return dispatch => {
        dispatch({type: WEBSOCKET_CONNECT, payload: url})
    }
}

export function sendMessage(name) {
    return dispatch => {
        dispatch({type: WEBSOCKET_SEND, payload: name})
    }
}

export function messageToActionAdapter(msg) {
    const event = JSON.parse(msg.body)
    if (eventToActionAdapters[event.type]) {
        return eventToActionAdapters[event.type](event)
    }
}