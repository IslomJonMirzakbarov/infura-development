import axios from 'axios'
import authStore from 'store/auth.store'

const httpRequest = axios.create({
  baseURL: 'https://api.oceandrive.network/',
  timeout: 100000
})

const errorHandler = (error, hooks) => {
  if (error?.response?.status === 401) {
    authStore.logout()
  }

  return Promise.reject(error.response)
}

httpRequest.interceptors.request.use((config) => {
  const token = authStore?.token?.access_token?.token
  if (token) {
    config.headers.Authorization = token
  }

  config.headers['X-Conun-Service'] = 'infura'

  return config
})

httpRequest.interceptors.response.use((response) => response.data, errorHandler)

export default httpRequest
