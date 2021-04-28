import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  list: [],
  data: {},
  categories: {}
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.list = action.payload;
    },
    setProductData: (state, action) => {
      state.data = action.payload;
    },
    setCategoryOwners: (state, action) => {
      state.categories.owners = action.payload;
    },
    setCategoryProducts: (state, action) => {
      state.categories.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    updateProduct: (state, action) => {
      state.list = state.list.map(item => item._id === action.payload.data._id ? action.payload.data : item);
    },
    removeProduct: (state, action) => {
      state.list.splice(action.payload, 1)
    },
  }
});

export const {
  setProductList,
  setProductData,
  setCategoryOwners,
  setCategoryProducts,
  setCategories,
  addProduct,
  updateProduct,
  removeProduct
} = productSlice.actions;

export const resetProduct = () => dispatch => {
  dispatch(setProductList([]));
  dispatch(setProductData({}));
  dispatch(setCategories({}));
};

export const productList = state => state.product.list;

export const productData = state => state.product.data;

export const productCategories = state => state.product.categories;

export default productSlice.reducer;
