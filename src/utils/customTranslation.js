import i18next from 'i18next'

const translations = {
  en: {
    '502_gateway_error':
      'Your transaction is in progress. It takes a 20~30 minutes.'
  },
  ko: {
    '502_gateway_error': '거래가 진행 중입니다. 20~30분 정도 소요됩니다.'
  }
}

const getBrowserLanguage = () => {
  const lang = navigator.language.split('-')[0]
  return translations[lang] ? lang : 'en'
}

export const getCustomTranslation = (key) => {
  const language = i18next.language || getBrowserLanguage()
  console.log('Language selected: ', language)
  return translations[language][key] || key
}
