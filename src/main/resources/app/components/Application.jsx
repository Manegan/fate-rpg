import React, {Component} from 'react'
import { connect } from 'react-redux'
import {connectToFateServer} from '../actions'

class Application extends Component {
    componentDidMount() {
        this.props.connectToFateServer("/portfolio")
    }

    render() {
        return (<div>
            <h2>Hello, World!</h2>
        </div>)
    }
}

export default connect(null, { connectToFateServer })(Application)