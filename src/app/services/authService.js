import Http from '../utils/Http';
import _ from 'lodash';
import {enableLoading, disableLoading} from '../store/loaderSlice';
import {authLogin} from '../store/authSlice';
import {resetBag} from '../store/bagSlice';
import {resetCheckout} from '../store/checkoutSlice';
import {resetOrder} from '../store/orderSlice';
import {resetProduct} from '../store/productSlice';
import {resetUser} from '../store/memberSlice';

/**
 * Login member
 *
 * @param data
 * @returns {function(*)}
 */
export function login(data) {
  return dispatch => {
    dispatch(enableLoading());
    dispatch(resetBag());
    dispatch(resetCheckout());
    dispatch(resetOrder());
    dispatch(resetProduct());
    dispatch(resetUser());
    return new Promise((resolve, reject) => {
      Http.post('auth/login', data)
        .then(res => {
          const {token} = res.data;
          dispatch(authLogin(token));
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          dispatch(disableLoading());
        })
    })
  }
}

/**
 * Register new member
 *
 * @param data
 * @returns {function(*)}
 */
export function register(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('auth/register', _.pickBy(data))
        .then(res => {
          const {token} = res.data;
          dispatch(authLogin(token));
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          dispatch(disableLoading());
        })
    })
  }
}

/**
 * Reset member password
 *
 * @param data
 * @returns {function(*)}
 */
export function resetPassword(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('auth/reset-password', data)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          dispatch(disableLoading());
        })
    })
  }
}

/**
 * Forgot member password
 *
 * @param data
 * @returns {function(*)}
 */
export function forgotPassword(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('auth/forgot-password', data)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          dispatch(disableLoading());
        })
    })
  }
}

/**
 * Verify member email
 *
 * @param token
 * @returns {function(*)}
 */
export function verifyEmail(token) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post(`auth/verify-email/${token}`)
        .then(res => {
          const {token} = res.data;
          dispatch(authLogin(token));
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          dispatch(disableLoading());
        })
    })
  }
}

/**
 * Re-send new email verification link
 *
 * @param data
 * @returns {function(*)}
 */
export function resendVerifyEmailLink(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('auth/resend-verify-email-link', data)
        .then((res) => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          dispatch(disableLoading());
        })
    })
  }
}
