import {configureStore} from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';
import bagReducer from './bagSlice';
import checkoutReducer from './checkoutSlice';
import orderReducer from './orderSlice';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    bag: bagReducer,
    checkout: checkoutReducer,
    order: orderReducer
  },
});
