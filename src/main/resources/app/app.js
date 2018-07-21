import React from 'react'
import { render } from 'react-dom'
import roomStore from './stores/roomStore'

import App from './components/Application.jsx'


const renderApp = (Component) => (
    render(
        <Component store={roomStore} />
        , document.getElementById('app'))
)
renderApp(App)