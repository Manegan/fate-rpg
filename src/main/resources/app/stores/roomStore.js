import { observable, action, computed} from 'mobx'

class roomStore {
    @observable eventSource = null
    @observable data = []

    @action connect(id) {
        this.data = []
        this.eventSource = new EventSource(`//localhost:8080/fate/test/${id}`)
        this.eventSource.onmessage = this.updateData.bind(this)
    }

    @action updateData(msg) {
        this.data.push(msg.data)
    }

    @computed get readyStateIsOk() {
        return this.eventSource
    }

}

const store = new roomStore()

export default store