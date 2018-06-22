import * as types from '../constants/ActionTypes'

var initialState = {
    messages: []
}

const greeting = (state = initialState, action) => {
    debugger
    switch(action.type) {
        case types.CHAT_MESSAGE:
            return Object.assign({}, state, {
                messages: state.messages.push(action.payload)
            })
        case types.WEBSOCKET_CONNECT:
            return Object.assign({}, state, {
                messages: state.messages.push(action.payload)
            })
        default:
            return state
    }
}

export default greeting