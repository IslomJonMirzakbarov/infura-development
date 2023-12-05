import axios from 'axios'
import authStore from 'store/auth.store'
import toast from 'react-hot-toast'
import { refreshToken } from 'services/auth.service'

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000
})

const errorHandler = async (error, hooks) => {
  const originalRequest = error.config
  if (
    error?.response?.data?.message &&
    error?.response?.data?.message !==
      "code=400, message=Key: 'CheckPoolReq.PoolName' Error:Field validation for 'PoolName' failed on the 'min' tag" &&
    error?.response?.data?.message !== 'pool already exists'
  ) {
    toast.error(capitalizeFirstLetter(error.response.data.message))
  }

  if (
    originalRequest.url.includes('auth/renew') &&
    error?.response?.status === 401
  ) {
    authStore.logout()
    return Promise.reject(error.response)
  }

  if (error?.response?.status === 401) {
    const token = authStore?.token?.refresh_token?.token
    if (token) {
      const res = await refreshToken(token)
      authStore.setAccessToken(res)
      return httpRequest(originalRequest)
    }
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
