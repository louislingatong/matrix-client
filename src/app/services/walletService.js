import Http from '../utils/Http';
import {enableLoading, disableLoading} from '../store/loaderSlice';
import {setWallet} from '../store/walletSlice';

/**
 * Fetch my wallet
 *
 * @returns {function(*)}
 */
export function fetchWallet() {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('wallet')
        .then(res => {
          const {data} = res.data;
          dispatch(setWallet(data));
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