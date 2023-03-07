import axios from 'axios'
import { store } from '../store/index'
import { authActions } from '../store/auth/auth.slice'
import { showAlert } from '../store/alert/alert.thunk'

export const baseURL = process.env.REACT_APP_BASE_URL
console.log(baseURL)
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

// import axios from 'axios'
// import { store } from '../store/index'
// import { showAlert } from '../store/alert/alert.thunk'

// export const baseURL = process.env.REACT_APP_BASE_URL
// console.log(baseURL)
// const request = axios.create({
//   baseURL,
//   timeout: 100000
// })

// const errorHandler = (error, hooks) => {
//   const status = error.response.status
//   if (status === 401 || status === 403) {
//   }

//   if (error.response?.data?.message)
//     store.dispatch(showAlert(error.response.data.message))
//   else store.dispatch(showAlert('___ERROR___'))

//   return Promise.reject(error.response)
// }

// request.interceptors.request.use(
//   (config) => {
//     const token = store.getState()?.auth?.token?.access?.token

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },

//   (error) => errorHandler(error)
//   )

//   request.interceptors.response.use((response) => response.data, errorHandler)

//   export default request

// const errorHandler = (error, hooks) => {
//   const token = store.getState().auth.token
//   const logoutParams = {
//     access_token: token,
//   };

//   if(error?.response?.status === 401) {
//     const refreshToken = store.getState().auth.refreshToken

//     const params = {
//       refresh_token: refreshToken,
//     }

//     const originalRequest = error.config

//     return Auth.refreshToken(params)
//       .then((res) => {
//         store.dispatch(authActions.setTokens(res))
//         return request(originalRequest);
//       })
//       .catch((err) => {
//         console.log(err)
//         return Promise.reject(error)
//       })
//   } else {
//     if (error?.response) {
//       if(error.response?.data?.data) {
//         if (error.response.data.data !== "rpc error: code = Internal desc = member group is required to add new member") {
//           store.dispatch(showAlert(error.response.data.data))
//         }
//       }
//       if (error?.response?.status === 403) {
//         store.dispatch(logoutAction(logoutParams)).unwrap().catch()
//       }
//     }

//     else store.dispatch(showAlert('___ERROR___'))

//     return Promise.reject(error.response)
//   }
// }
