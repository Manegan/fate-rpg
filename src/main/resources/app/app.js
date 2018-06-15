import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'

import App from './components/Application.jsx'

const store = createStore(reducer)

const renderApp = (Component) => (
    render(
        <Provider store={store}>
            <Component/>
        </Provider>
        , document.getElementById('app'))
)
renderApp(App)