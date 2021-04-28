import Http from '../utils/Http';
import {resetBag} from '../store/bagSlice';
import {setOrder, setOrderList} from '../store/orderSlice';
import {disableLoading, enableLoading} from '../store/loaderSlice';

/**
 * Create new order-management for registered member
 *
 * @param data
 * @returns {function(*)}
 */
export function createOrder(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('orders/place-order-management', data)
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
 * Create new order-management for guest member
 *
 * @param data
 * @returns {function(*)}
 */
export function createOrderGuest(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post('orders/place-order-management/guest', data)
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
 * Fetch all orders
 *
 * @returns {function(*)}
 */
export function fetchAllOrders() {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('orders')
        .then(res => {
          const {list} = res.data;
          dispatch(setOrderList(list));
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
 * Fetch orders by order-management number
 *
 * @returns {function(*)}
 */
export function fetchOrdersByOrderNumber(orderNumber) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get(`orders/${orderNumber}`)
        .then(res => {
          const {list} = res.data;
          dispatch(setOrder(list));
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
 * Update order-management status
 *
 * @returns {function(*)}
 */
export function updateOrderStatusByOrderNumber(orderNumber, status) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.put(`orders/${orderNumber}`, {status})
        .then(res => {
          const {status} = res.data;
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
