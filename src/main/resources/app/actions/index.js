import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_SEND
} from '../constants/ActionTypes'

export const CHAT_MESSAGE = 'CHAT_MESSAGE'

const eventToActionAdapters = {
    CHAT_MESSAGE: ({id, timestamp, payload: {user, message}}) =>
    ({type: types.MESSAGE_RECEIVED, payload: {id, timestamp, user, message}}),
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
    const event = JSON.parse(msg.data)
    if (eventToActionAdapters[event.type]) {
        return eventToActionAdapters[event.type](event)
    }
}