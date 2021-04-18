import {createSlice} from '@reduxjs/toolkit';

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
    }
  }
});

export const {setProductList, setProductData, setCategoryOwners, setCategoryProducts, setCategories} = productSlice.actions;

export const resetProduct = () => dispatch => {
  dispatch(setProductList([]));
  dispatch(setProductData({}));
  dispatch(setCategories({}));
};

export const productList = state => state.product.list;

export const productData = state => state.product.data;

export const productCategories = state => state.product.categories;

export default productSlice.reducer;
