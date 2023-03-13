import axios from 'axios'
import { store } from '../store/index'
import { authActions } from '../store/auth/auth.slice'
import { showAlert } from '../store/alert/alert.thunk'

export const baseURL = process.env.REACT_APP_BASE_URL
const request = axios.create({
  baseURL,
  timeout: 100000
})

const errorHandler = (error, hooks) => {
  const status = error.response.status
  if (status === 401 || status === 403) {
    const refresh_token = store.getState()?.auth?.token?.refresh?.token
    if (refresh_token) {
      return axios
        .post(`${baseURL}/auth/refresh-tokens`, { refresh_token })
        .then((response) => {
          const { access, refresh } = response.tokens
          store.dispatch(authActions.setToken({ access, refresh }))
          error.config.headers.Authorization = `Bearer ${access.token}`
          return axios.request(error.config)
        })
        .catch((error) => {
          store.dispatch(authActions.logout())
          window.location.reload()
        })
    } else {
      store.dispatch(authActions.logout())
      window.location.reload()
    }
  }

  if (error.response?.message) store.dispatch(showAlert(error.response.message))
  else store.dispatch(showAlert('___ERROR___'))

  return Promise.reject(error.response)
}

request.interceptors.request.use(
  (config) => {
    const token = store.getState()?.auth?.token?.access?.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },

  (error) => errorHandler(error)
)

request.interceptors.response.use((response) => response.data, errorHandler)

export default request
