import Http from '../utils/Http';
import {setUserList, setUserData} from '../store/userSlice';
import {enableLoading, disableLoading} from '../store/loaderSlice';

/**
 * Fetch all users
 *
 * @returns {function(*)}
 */
export function fetchAllUsers() {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('users')
        .then(res => {
          const {list} = res.data;
          dispatch(setUserList(list));
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
 * Fetch specific user-management by id
 *
 * @param id
 * @returns {function(*)}
 */
export function fetchUserById(id) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get(`users/${id}`)
        .then(res => {
          const {data} = res.data;
          dispatch(setUserData(data));
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
