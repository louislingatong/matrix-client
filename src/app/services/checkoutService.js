import Http from '../utils/Http';
import {setPaymentMethodList, setIsVerifiedEmail} from '../store/checkoutSlice';
import {enableLoading, disableLoading} from '../store/loaderSlice';

/**
 * Fetch all payment methods
 *
 * @returns {function(*)}
 */
export function fetchAllPaymentMethods() {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('payment-methods')
        .then(res => {
          const {list} = res.data;
          dispatch(setPaymentMethodList(list));
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
 * Check if email is verified
 *
 * @param email
 * @returns {function(*)}
 */
export function checkEmailStatus(email) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('orders/check-email-status', {params: {email}})
        .then(res => {
          const {isVerified} = res.data;
          dispatch(setIsVerifiedEmail(isVerified));
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
 * Send email verification code
 *
 * @param email
 * @returns {function(*)}
 */
export function sendEmailVerificationCode(email) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('orders/send-verify-email-code', {email})
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
 * Verify email
 *
 * @param data
 * @returns {function(*)}
 */
export function verifyEmail(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.put('orders/verify-email', data)
        .then(res => {
          const {isVerified} = res.data;
          dispatch(setIsVerifiedEmail(isVerified));
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