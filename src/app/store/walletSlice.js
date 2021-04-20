import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet: (state, action) => {
      state.data = action.payload;
    },
  }
});

export const {setWallet} = walletSlice.actions;

export const walletData = state => state.wallet.data;

export default walletSlice.reducer;
