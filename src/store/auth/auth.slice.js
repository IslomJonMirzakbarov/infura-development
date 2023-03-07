import { createSlice } from '@reduxjs/toolkit'

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    token: null,
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
    },
    setToken: (state, { payload }) => {
      state.token = payload
    },
    setUser: (state, { payload }) => {
      state.user = payload
    },
    setWalletAddress: (state, { payload }) => {
      state.walletAddress = payload
    }
  }
})
