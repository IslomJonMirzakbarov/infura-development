import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class LanguageStore {
  language = 'en'

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'LanguageStore',
      properties: ['language'],
      storage: window.localStorage
    })
  }

  setLanguage(lng) {
    this.language = lng
  }
}

const languageStore = new LanguageStore()
export default languageStore
