import * as types from '../constants/ActionTypes'

export function connectToFateServer(url) {
    return dispatch => {
        dispatch({type: types.WEBSOCKET_CONNECT, payload: url})
    }
}