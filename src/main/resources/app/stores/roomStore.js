import { observable, action } from 'mobx'

class roomStore {
    @observable eventSource = null
    @observable data = []

    @action connect = id => {
        this.eventSource = new EventSource(`//localhost:8080/fate/test/${id}`)
        this.eventSource.onopen = param => console.log("connected! ", param)
        this.eventSource.onmessage = this.updateData()
        this.eventSource.onerror = () => console.log("error oocured...")
    }

    @action updateData = msg => this.data = this.data.replace(msg, ...this.data)

}

const store = new roomStore()

export default store