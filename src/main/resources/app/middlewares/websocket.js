import Stomp from 'stomp-client'
import * as types from '../constants/ActionTypes'

class NullSocket {
    send(message) {
        console.log(`Warning: send called on NullSocket, dispatch a ${types.WEBSOCKET_CONNECT} first`)
    }
}

function factory({messageToActionAdapter}) {
    let socket = new NullSocket()
    let stompClient

    return ({dispatch}) => {
        return newt => action => {
            switch (action.type) {
                case types.WEBSOCKET_CONNECT:
                    stompClient = new Stomp(action.payload, 8080)
                    stompClient.connect("", "", () => dispatch({type: types.WEBSOCKET_CONNECT, payload: "Connected!"}))
                    stompClient.subscribe("/topic/greeting", m => dispatch(messageToActionAdapter(m) || {type: types.CHAT_MESSAGE, payload: m.body}))
                    break
                case types.WEBSOCKET_SEND:
                    stompClient.send("/app/greeting", {}, JSON.stringify(action.payload))
                    break
            }
            return newt(action)
        }
    }
}

export default factory