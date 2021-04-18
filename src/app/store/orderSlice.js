import {createSlice} from '@reduxjs/toolkit';
import _ from "lodash";

const initialState = {
  list: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const {setOrderList} = orderSlice.actions;

export const resetOrder = () => dispatch => {
  dispatch(setOrderList([]));
};

export const orderList = state => {
  return _.chain(state.order.list).groupBy((o) => o.orderNumber).valuesIn().head().value();
};

export const orderNumber = state => {
  return _.chain(state.order.list).groupBy((o) => o.orderNumber).keysIn().head().value();
};

export const orderStatus = state => {
  return _.chain(state.order.list).groupBy((o) => o.orderNumber).keysIn().head().value();
};

export default orderSlice.reducer;
