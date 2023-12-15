import { makeAutoObservable } from 'mobx'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  openServerError = false

  setOpenServerError(value) {
    this.openServerError = value
  }
}

const modalStore = new Store()
export default modalStore
