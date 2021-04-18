import Http from '../utils/Http';
import {disableLoading, enableLoading} from '../store/loaderSlice';
import {setOrderList} from '../store/orderSlice';
import _ from 'lodash';

/**
 * Fetch order by order number
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
 * Pay order
 *
 * @param orderNumber
 * @param data
 * @returns {function(*)}
 */
export function payOrder(orderNumber, data) {
  const formData = new FormData();
  _.toPairs(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.post(`orders/${orderNumber}/pay`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
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