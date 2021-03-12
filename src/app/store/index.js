import {configureStore} from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    user: userReducer
  },
});
