import {createSlice} from '@reduxjs/toolkit';
import _ from "lodash";

const initialState = {
  list: [],
  data: {}
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state.list = action.payload;
    },
    setOrderData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const {setOrderList, setOrderData} = orderSlice.actions;

export const resetOrder = () => dispatch => {
  dispatch(setOrderList([]));
  dispatch(setOrderData([]));
};

export const setOrder = (list) => dispatch => {
  const groupedOrder = _.groupBy(list,(o) => o.orderNumber);
  dispatch(setOrderData(groupedOrder));
};

export const orderList = state => {
  return _.chain(state.order.list).groupBy((o) => o.orderNumber).toPairs().value();
};

export const orderData = state => state.order.data;

export default orderSlice.reducer;
