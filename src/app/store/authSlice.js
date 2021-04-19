import {createSlice} from '@reduxjs/toolkit';
import HTTP from '../utils/Http';

const initialState = {
  isAuthenticated: false,
  me: {user: {}}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setMe: (state, action) => {
      state.me = action.payload;
    },
    setAvatar: (state, action) => {
      state.me.avatar = action.payload;
    }
  }
});

export const {authenticate, setMe, setAvatar} = authSlice.actions;

export const authLogin = (token) => dispatch => {
  localStorage.setItem('auth_token', token)
  HTTP.defaults.headers.common['Authorization'] = token;
  dispatch(authenticate(true));
};

export const authCheck = () => dispatch => {
  if (!!localStorage.getItem('auth_token')) {
    HTTP.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token');
    dispatch(authenticate(true));
  }
};

export const authLogout = () => dispatch => {
  localStorage.removeItem('auth_token')
  dispatch(authenticate(false));
  dispatch(setMe({user: {}}));
};

export const loggedInStatus = state => state.auth.isAuthenticated;
export const loggedInUser = state => state.auth.me;

export default authSlice.reducer;
