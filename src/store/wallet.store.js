import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class Store {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'walletStore',
      properties: ['address', 'type'],
      storage: window.localStorage
    })
  }

  address = null
  type = null

  setWallet(value) {
    this.address = value.address
    this.type = value.type
  }

  logout() {
    this.address = null
    this.type = null
  }
}

const walletStore = new Store()
export default walletStore
