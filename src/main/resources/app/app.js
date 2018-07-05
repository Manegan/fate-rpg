import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'
import websocket from './middlewares/websocket'
import {messageToActionAdapter} from './actions/'

import reducers from './reducers'

import App from './components/Application.jsx'

import {client} from 'websocket'

const store = applyMiddleware(
    reduxThunk,
    websocket({messageToActionAdapter})
)(createStore)(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const renderApp = (Component) => (
    render(
        <Provider store={store}>
            <Component/>
        </Provider>
        , document.getElementById('app'))
)
renderApp(App)