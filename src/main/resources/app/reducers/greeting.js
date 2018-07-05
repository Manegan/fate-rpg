import * as types from '../constants/ActionTypes'

var initialState = {
    messages: []
}

const greeting = (state = initialState, action) => {
    switch(action.type) {
        case types.CHAT_MESSAGE || types.WEBSOCKET_CONNECT:
            return Object.assign({}, state, {
                messages: [action.payload, ...state.messages]
            })
        default:
            return state
    }
}

export default greeting