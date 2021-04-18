import Http from '../utils/Http';
import {disableLoading, enableLoading} from '../store/loaderSlice';
import {
  setProductList,
  setProductData,
  setCategoryOwners,
  setCategoryProducts
} from '../store/productSlice';

/**
 * Fetch all products
 *
 * @returns {function(*)}
 */
export function fetchAllProducts() {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('products')
        .then(res => {
          const {list} = res.data;
          dispatch(setProductList(list));
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
 * Fetch product by id
 *
 * @param id
 * @returns {function(*)}
 */
export function fetchProductById(id) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get(`products/${id}`)
        .then(res => {
          const {data} = res.data;
          dispatch(setProductData(data));
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
 * Fetch all seller products
 *
 * @returns {function(*)}
 */
export function fetchAllSellerProducts(filter) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('seller-products', {params: filter})
        .then(res => {
          const {list} = res.data;
          dispatch(setProductList(list));
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
 * Fetch seller product by id
 *
 * @param id
 * @returns {function(*)}
 */
export function fetchSellerProductById(id) {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get(`seller-products/${id}`)
        .then(res => {
          const {data} = res.data;
          dispatch(setProductData(data));
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
 * Fetch category owners
 *
 * @returns {function(*)}
 */
export function fetchCategoryOwners() {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('seller-products/owners')
        .then(res => {
          const {list} = res.data;
          dispatch(setCategoryOwners(list));
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
 * Fetch category products
 *
 * @returns {function(*)}
 */
export function fetchCategoryProducts() {
  return dispatch => {
    dispatch(enableLoading());
    return new Promise((resolve, reject) => {
      Http.get('seller-products/products')
        .then(res => {
          const {list} = res.data;
          dispatch(setCategoryProducts(list));
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