import Http from '../utils/Http';
import {setMe, setAvatar} from '../store/authSlice';
import {disableLoading, enableLoading} from '../store/loaderSlice';

/**
 * Retrieve logged in user profile-edit
 *
 * @returns {function(*)}
 */
export function me() {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('profile')
        .then(res => {
          dispatch(setMe(res.data));
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
 * Update logged in user
 *
 * @param data
 * @returns {function(*)}
 */
export function update(data) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.put('profile', data)
        .then(res => {
          dispatch(setMe(res.data));
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
 * Update logged in user avatar
 *
 * @param avatar
 * @returns {function(*)}
 */
export function updateAvatar(avatar) {
  const formData = new FormData();
  formData.append('avatar', avatar);

  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.put('profile-edit/update-avatar', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
          dispatch(setAvatar(res.data));
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