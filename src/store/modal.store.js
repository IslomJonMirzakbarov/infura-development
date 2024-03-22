import { makeAutoObservable } from 'mobx'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  openServerError = false
  openBadGatewayError = false

  setOpenServerError(value) {
    this.openServerError = value
  }
  setOpenBadGatewayError(value) {
    this.openBadGatewayError = value
  }
}

const modalStore = new Store()
export default modalStore
