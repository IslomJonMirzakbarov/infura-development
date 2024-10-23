import axios from 'axios'
import toast from 'react-hot-toast'
import { refreshToken } from 'services/auth.service'
import authStore from 'store/auth.store'
import modalStore from 'store/modal.store'
import { getCustomTranslation } from 'utils/customTranslation'

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
  withCredentials: true
})

const errorHandler = async (error, hooks) => {
  console.log('https service error: ', error)

  const originalRequest = error.config
  if (
    error?.response?.data?.message &&
    error?.response?.data?.message !==
      "code=400, message=Key: 'CheckPoolReq.PoolName' Error:Field validation for 'PoolName' failed on the 'min' tag" &&
    error?.response?.data?.message !== 'pool already exists' &&
    !error?.response?.data?.message.includes('Pool not found')
  ) {
    toast.error(capitalizeFirstLetter(error.response.data.message))
  }

  if (error?.code === 'ERR_NETWORK') {
    toast.error(capitalizeFirstLetter(error?.message))
  }

  if (
    error?.response?.status === 500 &&
    !error?.response?.data?.message.includes('Pool not found')
  ) {
    modalStore.setOpenServerError(true)
  }

  if (error?.response?.status == 502) {
    toast.error(getCustomTranslation('502_gateway_error'))
    // modalStore.setOpenBadGatewayError(true)
  }

  if (
    originalRequest.url.includes('auth/renew') &&
    error?.response?.status === 401
  ) {
    authStore.logout()
    return Promise.reject(error.response)
  }

  // if (error?.response?.status === 401) {
  //   const token = authStore?.token?.refresh?.token
  //   if (token) {
  //     const res = await refreshToken(token)
  //     authStore.setAccessToken(res?.details?.token?.access?.token)
  //     return httpRequest(originalRequest)
  //   }
  // }

  if (error?.response?.status === 401) {
    const token = authStore?.token?.refresh?.token

    if (token) {
      try {
        const res = await refreshToken(token)
        authStore.setAccessToken(res?.details?.token?.access?.token)
        originalRequest.headers.Authorization = `Bearer ${res?.details?.token?.access?.token}`

        return httpRequest(originalRequest)
      } catch (refreshError) {
        authStore.logout() // If refresh fails, logout the user
        return Promise.reject(refreshError)
      }
    } else {
      authStore.logout()
    }
  }

  return Promise.reject(error.response)
}

httpRequest.interceptors.request.use((config) => {
  if (!config.headers['Authorization'] && !config.url.includes('app/stats')) {
    const token = authStore?.token?.access?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // config.headers['X-Conun-Service'] = 'infura'
  }

  return config
})

httpRequest.interceptors.response.use((response) => response.data, errorHandler)

export default httpRequest

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
