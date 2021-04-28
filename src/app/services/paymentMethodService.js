import Http from '../utils/Http';
import {setPaymentMethodList, setPaymentMethodData, addPaymentMethod, updatePaymentMethod, removePaymentMethod} from '../store/paymentMethodSlice';
import {enableLoading, disableLoading} from '../store/loaderSlice';

/**
 * Create new payment method
 *
 * @param data
 * @returns {function(*)}
 */
export function createPaymentMethod(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('payment-methods', data)
        .then(res => {
          const {data} = res.data;
          dispatch(addPaymentMethod(data));
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
 * Fetch specific payment method by id
 *
 * @param id
 * @returns {function(*)}
 */
export function fetchPaymentMethodById(id) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get(`payment-methods/${id}`)
        .then(res => {
          const {data} = res.data;
          dispatch(setPaymentMethodData(data));
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
 * Update payment method by id
 *
 * @param id
 * @param data
 * @param index
 * @returns {function(*)}
 */
export function updatePaymentMethodById(id, data, index) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.put(`payment-methods/${id}`, data)
        .then(res => {
          const {data} = res.data;
          dispatch(updatePaymentMethod({data, index}));
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
 * Delete payment method by id
 *
 * @param id
 * @param index
 * @returns {function(*)}
 */
export function deletePaymentMethodById(id, index) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.delete(`payment-methods/${id}`)
        .then(res => {
          dispatch(removePaymentMethod(index));
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
