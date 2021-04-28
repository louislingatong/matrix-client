import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  list: [],
  data: {}
};

export const paymentMethodSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {
    setPaymentMethodList: (state, action) => {
      state.list = action.payload;
    },
    setPaymentMethodData: (state, action) => {
      state.data = action.payload;
    },
    addPaymentMethod: (state, action) => {
      state.list.push(action.payload);
    },
    updatePaymentMethod: (state, action) => {
      state.list[action.payload.index] = action.payload.data;
    },
    removePaymentMethod: (state, action) => {
      state.list.splice(action.payload, 1)
    },
  }
});

export const {setPaymentMethodList, setPaymentMethodData, addPaymentMethod, updatePaymentMethod, removePaymentMethod} = paymentMethodSlice.actions;

export const resetPaymentMethod = () => dispatch => {
  dispatch(setPaymentMethodList([]));
  dispatch(setPaymentMethodData({}));
};

export const paymentMethodList = state => state.paymentMethod.list;

export const paymentMethodData = state => state.paymentMethod.data;

export default paymentMethodSlice.reducer;
