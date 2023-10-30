import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class Store {
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'poolStore',
      properties: ['pools'],
      storage: window.localStorage
    })
  }

  pools = []

  addPool(value) {
    this.pools.push(value)
  }
}

const poolStore = new Store()
export default poolStore
