import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class Store {
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'authStore',
      properties: ['isAuth', 'userData', 'token'],
      storage: window.localStorage
    })
  }

  isAuth = false
  userData = {}
  token = {
    access: {
      token: null,
      expires: null
    },
    refresh: {
      token: null,
      expires: null
    }
  }

  setIsAuth(value) {
    this.isAuth = value
  }

  setAccessToken(value) {
    if (!this.token.access) {
      this.token.access = {
        token: null,
        expires: null
      }
    }
    this.token.access.token = value
  }

  setRefreshToken(value) {
    if (!this.token.refresh) {
      this.token.refresh = {
        token: null,
        expires: null
      }
    }
    this.token.refresh.token = value
  }

  login(data) {
    this.isAuth = true
    this.userData = data
    this.token = data.token
  }

  logout() {
    this.isAuth = false
    this.userData = {}
    this.token = {
      access: {
        token: null,
        expires: null
      },
      refresh: {
        token: null,
        expires: null
      }
    }
  }
}

const authStore = new Store()
export default authStore
