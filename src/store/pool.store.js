import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class Store {
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'poolStore',
      properties: ['pools', 'isSelected', 'poolCount'],
      storage: window.localStorage
    })
  }
  billingItems = [
    {
      name: 'Free',
      price: 0,
      storage: '100 GB',
      gatewayCount: 1,
      replication: 1,
      isFree: true,
      isCurrentPlan: false,
      disabled: false
    },
    {
      name: 'Enterprise',
      text: 'This plan is custom plan for who wants to offer custom packaging. Feel free to contact us.',
      priceText: 'Get apersonalized plan',
      isEnterprise: true
    }
  ]
  pools = []
  isSelected = false
  poolCount = 0

  addPool(value) {
    this.pools.push(value)
  }
  setSelected(value) {
    this.isSelected = value
  }
  changeBillingItems(value) {
    this.billingItems = value
  }
  setPoolCount(value) {
    this.poolCount = value
  }
}

const poolStore = new Store()
export default poolStore
