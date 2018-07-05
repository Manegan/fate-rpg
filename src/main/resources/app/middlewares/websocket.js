import * as Stomp from '@stomp/stompjs'
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
                    stompClient = Stomp.over(() => new WebSocket(action.payload))
                    stompClient.connect("guest", "guest", () => {
                        console.log("Connected! Now Subscribing...")
                        stompClient.subscribe("/topic/greeting", m => dispatch(messageToActionAdapter(m) || {type: types.CHAT_MESSAGE, payload: m.body}))
                    })
                    break
                case types.WEBSOCKET_SEND:
                    stompClient.send("/app/greeting", {}, JSON.stringify({"type":types.CHAT_MESSAGE, "payload":action.payload}))
                    break
            }
            return newt(action)
        }
    }
}

export default factory