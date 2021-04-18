import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  paymentMethodList: [],
  deliveryAddressData: {},
  paymentMethodData: {},
  isVerifiedEmail: false
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setPaymentMethodList: (state, action) => {
      state.paymentMethodList = action.payload;
    },
    setDeliveryAddressData: (state, action) => {
      state.deliveryAddressData = action.payload;
    },
    setPaymentMethodData: (state, action) => {
      state.paymentMethodData = action.payload;
    },
    setIsVerifiedEmail: (state, action) => {
      state.isVerifiedEmail = action.payload;
    }
  }
});

export const {setPaymentMethodList, setDeliveryAddressData, setPaymentMethodData, setIsVerifiedEmail} = checkoutSlice.actions;

export const resetCheckout = () => dispatch => {
  dispatch(setPaymentMethodList([]));
  dispatch(setDeliveryAddressData({}));
  dispatch(setPaymentMethodData({}));
  dispatch(setIsVerifiedEmail(false));
};

export const paymentMethodList = state => state.checkout.paymentMethodList;

export const deliveryAddressData = state => state.checkout.deliveryAddressData;

export const paymentMethodData = state => state.checkout.paymentMethodData;

export const emailStatus = state => state.checkout.isVerifiedEmail;

export default checkoutSlice.reducer;
