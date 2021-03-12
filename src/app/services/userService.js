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
          dispatch(setUserList(list))
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
 * Fetch specific user by id
 *
 * @param id
 * @returns {function(*)}
 */
export function fetchUser(id) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get(`users/${id}`)
        .then(res => {
          const {data} = res.data;
          dispatch(setUserData(data));
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
