import axios from 'axios'
import authStore from 'store/auth.store'
import toast from 'react-hot-toast'

const httpRequest = axios.create({
  baseURL: 'https://api.oceandrive.network/',
  timeout: 100000
})

const errorHandler = (error, hooks) => {
  if (error?.response?.data?.message) {
    toast.error(capitalizeFirstLetter(error.response.data.message))
  }

  if (error?.response?.status === 401) {
    authStore.logout()
  }

  return Promise.reject(error.response)
}

httpRequest.interceptors.request.use((config) => {
  const token = authStore?.token?.access_token?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers['X-Conun-Service'] = 'infura'

  return config
})

httpRequest.interceptors.response.use((response) => response.data, errorHandler)

export default httpRequest

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
