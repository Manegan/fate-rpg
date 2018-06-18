import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'
import websocket from './middlewares/websocket'
import {messageToActionAdapter} from './actions/'

import reducers from './reducers'

import App from './components/Application.jsx'

const store = applyMiddleware(
    reduxThunk,
    websocket({messageToActionAdapter})
)(createStore)(reducers)

const renderApp = (Component) => (
    render(
        <Provider store={store}>
            <Component/>
        </Provider>
        , document.getElementById('app'))
)
renderApp(App)