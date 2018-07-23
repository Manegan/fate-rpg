import { observable, action, computed} from 'mobx'

class roomStore {
    @observable eventSource = null
    @observable data = []

    @action connect(id) {
        this.eventSource = new EventSource(`//localhost:8080/fate/test/${id}`)
        // this.eventSource.onopen = param => console.log("connected! ", param)
        this.eventSource.onmessage = this.updateData.bind(this)
    }

    @action updateData(msg) {
        console.log(this.data)
        this.data = observable([msg.data, ...this.data.slice()])
    }

    @computed get readyStateIsOk() {
        return this.eventSource
    }

}

const store = new roomStore()

export default store