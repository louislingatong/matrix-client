import Http from '../utils/Http';
import {authLogin} from '../store/authSlice';
import {enableLoading, disableLoading} from '../store/loaderSlice';
import _ from 'lodash';

/**
 * Login user
 *
 * @param params
 * @returns {function(*)}
 */
export function login(params) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('auth/login', params)
        .then(res => {
          const {token} = res.data;
          dispatch(authLogin(token))
          resolve(res);
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
 * Register new user
 *
 * @param params
 * @returns {function(*)}
 */
export function register(params) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('auth/register', _.pickBy(params))
        .then(res => {
          const {token} = res.data;
          dispatch(authLogin(token));
          resolve(res);
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
 * Reset user password
 *
 * @param params
 * @returns {function(*)}
 */
export function resetPassword(params) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('auth/reset-password', params)
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
 * Forgot user password
 *
 * @param params
 * @returns {function(*)}
 */
export function forgotPassword(params) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('auth/forgot-password', params)
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
 * Verify user email
 *
 * @param params
 * @returns {function(*)}
 */
export function verifyEmail(token) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post(`auth/verify-email/${token}`)
        .then((res) => {
          const {token} = res.data;
          dispatch(authLogin(token));
          resolve(res);
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
 * @param params
 * @returns {function(*)}
 */
export function resendVerifyEmailLink(params) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('auth/resend-verify-email-link', params)
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
