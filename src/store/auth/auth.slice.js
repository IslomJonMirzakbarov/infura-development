import { createSlice } from '@reduxjs/toolkit';

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    token: null,
    mnemonics: null,
    privateKey: null,
    walletAddress: null
  },
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setMnemonics: (state, { payload }) => {
      state.mnemonics = payload;
    },
    setPrivateKey: (state, { payload }) => {
      state.privateKey = payload;
    },
    setWalletAddress: (state, { payload }) => {
      state.walletAddress = payload;
    }
  }
});
