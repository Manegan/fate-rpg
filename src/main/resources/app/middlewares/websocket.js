import * as types from '../constants/ActionTypes'

class NullSocket {
    send(message) {
        console.log(`Warning: send called on NullSocket, dispatch a ${types.WEBSOCKET_CONNECT} first`)
    }
}

function factory({messageToActionAdapter}) {
    let socket = new NullSocket()

    return ({dispatch}) => {
        return newt => action => {
            switch (action.type) {
                case types.WEBSOCKET_CONNECT:
                    socket = new WebSocket(action.payload.url)
                    socket.onmessage = (msg) => {
                        dispatch(messageToActionAdapter(msg) || {type:types.WEBSOCKET_CONNECT, payload: msg.data})
                    }
                    break;
                case types.WEBSOCKET_SEND:
                    socket.send(JSON.stringify(action.payload))
                    break
            }
            return newt(action)
        }
    }
}

export default factory