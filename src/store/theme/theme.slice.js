import { createSlice } from '@reduxjs/toolkit';

export const {
  actions: { setDarkMode, setLightMode },
  reducer: themeReducer
} = createSlice({
  name: 'auth',
  initialState: {
    isLight: true
  },
  reducers: {
    setDarkMode: (state) => {
      state.isLight = false;
    },
    setLightMode: (state) => {
      state.isLight = true;
    }
  }
});
