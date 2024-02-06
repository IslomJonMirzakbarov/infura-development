import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { configure } from 'mobx'
import './i18n'

setTimeout(() =>
  configure({
    enforceActions: 'never',
    reactionScheduler: (f) => setTimeout(f)
  })
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

reportWebVitals()
