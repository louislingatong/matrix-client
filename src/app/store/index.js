import {configureStore} from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import authReducer from './authSlice';
import memberReducer from './memberSlice';
import productReducer from './productSlice';
import bagReducer from './bagSlice';
import checkoutReducer from './checkoutSlice';
import orderReducer from './orderSlice';
import walletReducer from './walletSlice';
import userReducer from './userSlice';
import paymentMethodReducer from './paymentMethodSlice';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    member: memberReducer,
    product: productReducer,
    bag: bagReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    wallet: walletReducer,
    user: userReducer,
    paymentMethod: paymentMethodReducer
  },
});
