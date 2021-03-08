import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    enableLoading: (state) => {
      state.isLoading = true;
    },
    disableLoading: (state) => {
      state.isLoading = false;
    },
  }
});

export const {enableLoading, disableLoading} = loaderSlice.actions;

export const loaderStatus = state => state.loader.isLoading;

export default loaderSlice.reducer;
