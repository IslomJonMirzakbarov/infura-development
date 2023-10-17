import { createSlice } from '@reduxjs/toolkit';

export const { actions: popupActions, reducer: popupReducer } = createSlice({
  name: 'popup',
  initialState: {
    updatePopup: {
      open: false,
      version: null
    }
  },
  reducers: {
    toggleStorePopup: (state, { payload: { key, res } }) => {
      state[key] = res;
    }
  }
});
