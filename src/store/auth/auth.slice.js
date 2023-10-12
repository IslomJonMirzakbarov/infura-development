import { createSlice } from '@reduxjs/toolkit'

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    token: {
      access_token: {},
      refresh_token: {}
    },
    walletAddress: null,
    user: null
  },
  reducers: {
    login: (state) => {
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
      state.token = null
      state.user = null
      state.walletAddress = null
    },
    setToken: (state, { payload }) => {
      state.token = payload
    },
    setAccessToken: (state, { payload }) => {
      state.token.access_token = payload
    },
    setUser: (state, { payload }) => {
      state.user = payload
    },
    setWalletAddress: (state, { payload }) => {
      state.walletAddress = payload
    }
  }
})
