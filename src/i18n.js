import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enJSON from './locale/en/en.json'
import krJSON from './locale/kr/kr.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    ko: { ...krJSON }
  },
  lng: 'en'
})
