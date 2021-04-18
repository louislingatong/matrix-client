import Http from '../utils/Http';
import {resetBag} from '../store/bagSlice';
import {setOrderList} from '../store/orderSlice';
import {disableLoading, enableLoading} from '../store/loaderSlice';

/**
 * Create new order for registered user
 *
 * @param data
 * @returns {function(*)}
 */
export function createOrder(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('orders/place-order', data)
        .then(res => {
          const {orderList} = res.data;
          dispatch(resetBag());
          dispatch(setOrderList(orderList));
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
 * Create new order for guest user
 *
 * @param data
 * @returns {function(*)}
 */
export function createOrderGuest(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('orders/guest-place-order', data)
        .then(res => {
          const {orderList} = res.data;
          dispatch(resetBag());
          dispatch(setOrderList(orderList));
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
