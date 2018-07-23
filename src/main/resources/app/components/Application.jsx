import React, {Component} from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

@observer
class Application extends Component {
    @observable currentRoom = "0"
    @observable msg = ""

    constructor(props) {
        super(props)
    }

    renderMessages() {
        let render = this.props.store.data.slice().map((value,i) => <div key={i}>{value}</div>)
        if (this.props.store.readyStateIsOk) {
            render.unshift(<Button onClick={(e) => this.sendMessage(e)}>Send</Button>)
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

    sendMessage(e) {
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
            <Button onClick={(e) => this.props.store.connect(this.currentRoom)}>Connect</Button>
            {this.renderMessages()}
        </div>)
    }
}

export default Application