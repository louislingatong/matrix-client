import Http from '../utils/Http';
import {setMemberList, setMemberData} from '../store/memberSlice';
import {enableLoading, disableLoading} from '../store/loaderSlice';

/**
 * Fetch all members
 *
 * @returns {function(*)}
 */
export function fetchAllMembers() {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('users/members')
        .then(res => {
          const {list} = res.data;
          dispatch(setMemberList(list));
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
 * Fetch specific member by id
 *
 * @param id
 * @returns {function(*)}
 */
export function fetchMemberById(id) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get(`users/${id}`)
        .then(res => {
          const {data} = res.data;
          dispatch(setMemberData(data));
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
