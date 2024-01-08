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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
