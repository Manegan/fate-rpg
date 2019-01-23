import React, {Component} from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

@observer
class Application extends Component {
    @observable currentRoom = "0"
    @observable msg = ""

    chatRoomStyle={
        height: '400px',
        overflowY: 'scroll'
    }

    constructor(props) {
        super(props)
    }

    renderMessages() {
        let render = this.props.store.data.slice().map((value,i) => <div key={i}>{value}</div>)
        return render
    }

    renderMsgTextBox() {
        let render = []
        if (this.props.store.readyStateIsOk) {
            render.push(<Input type="text" placeholder="Your message" onChange={this.changeMsg.bind(this)}/>)
            render.push(<Button onClick={() => this.sendMessage()}>Send</Button>)
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
        fetch(`http://localhost:8080/fate/test/${this.currentRoom}`, {
            method: "post",
            body: this.msg
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
            <Button onKeyPress={(e) => {if (e.key === "enter") this.props.store.connect(this.currentRoom)}}
                    onClick={() => this.props.store.connect(this.currentRoom)}>Connect</Button>
            <div style={this.chatRoomStyle}>
                {this.renderMessages()}
            </div>
            {this.renderMsgTextBox()}
        </div>)
    }
}

export default Application