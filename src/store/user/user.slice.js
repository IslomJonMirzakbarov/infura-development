import { createSlice } from '@reduxjs/toolkit';

export const { actions: userActions, reducer: userReducer } = createSlice({
  name: 'user',
  initialState: {
    user: false
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    }
  }
});
