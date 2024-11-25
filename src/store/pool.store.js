import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class Store {
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'poolStore',
      properties: ['isSelected', 'poolCount', 'pendingPools'],
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
      text: 'This plan is a custom plan for those who want custom packaging. Feel free to contact us. ',
      priceText: 'Get a personalized plan',
      isEnterprise: true,
      disabled: false
    }
  ]
  isSelected = false
  poolCount = null
  pendingPools = []

  setSelected(value) {
    this.isSelected = value
  }
  setPoolCount(value) {
    this.poolCount = value
  }
  changeBillingItems(value) {
    this.billingItems = value
  }
  addPendingPool(poolData) {
    this.pendingPools.push(poolData)
  }
  removePendingPool(txHash) {
    this.pendingPools = this.pendingPools.filter(pool => pool.txHash !== txHash)
  }
}

const poolStore = new Store()
export default poolStore
