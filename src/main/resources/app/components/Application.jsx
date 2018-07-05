import React, {Component} from 'react'
import { connect } from 'react-redux'
import {connectToFateServer, sendMessage} from '../actions'

class Application extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        this.props.connectToFateServer("ws://localhost:8080/portfolio")
    }

    sendMessage() {
        this.props.sendMessage()
    }

    changeName(e) {
        this.setState({name: e.target.value})
    }

    render() {
        return (<div>
            <h2>Hello, World!</h2>
            <input
                type="text"
                value={this.state.name}
                onChange={this.changeName.bind(this)}/>
            <button onClick={this.sendMessage.bind(this)}>Send greetings</button>
        </div>)
    }
}

export default connect(null, { connectToFateServer, sendMessage })(Application)