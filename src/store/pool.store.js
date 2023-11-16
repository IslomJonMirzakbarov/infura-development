import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class Store {
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'poolStore',
      properties: ['isSelected', 'poolCount'],
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
  isSelected = false
  poolCount = null

  setSelected(value) {
    this.isSelected = value
  }
  setPoolCount(value) {
    this.poolCount = value
  }
  changeBillingItems(value) {
    this.billingItems = value
  }
}

const poolStore = new Store()
export default poolStore
