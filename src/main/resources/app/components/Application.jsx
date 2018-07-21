import React, {Component} from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

@observer
class Application extends Component {
    @observable currentRoom = ""
    @observable msg = ""

    constructor(props) {
        super(props)
    }

    renderMessages() {
        let render = (this.props.store.data || []).map(value => <div>{value}</div>)
        console.log(this.props.store.eventSource.readyState)
        if (this.props.store.eventSource.readyState === 1) {
            render.unshift(<Button onClick={this.sendMessage.bind(this)}>Send</Button>)
            render.unshift(<Input type="text" placeholder="Your message" onChange={this.changeMsg.bind(this)}/>)
        }
        return render
    }

    @action changeId(e) {
        this.currentRoom = e.target.value
    }

    @action changeMsg(e) {
        this.msg = e.target.value
    }

    sendMessage() {
        console.log(this.msg)
        fetch(`http://localhost:8080/fate/test/${this.currentRoom}`, {
            method: "post",
            body: JSON.stringify(this.msg)
        }).then(res => {
            console.log(res)
        })
    }

    render() {
        return (<div>
            <Input
                placeholder="Room id"
                type="text"
                value={this.currentRoom}
                onChange={this.changeId.bind(this)}/>
            <Button onClick={this.props.store.connect(this.currentRoom)}>Connect</Button>
            {this.renderMessages.bind(this)}
        </div>)
    }
}

export default Application