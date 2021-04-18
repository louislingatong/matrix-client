import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  items: [],
};

export const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  }
});

export const {setItems} = bagSlice.actions;

export const resetBag = () => dispatch => {
  sessionStorage.removeItem('bag_items');
  dispatch(setItems([]));
};

export const setBagItems = (list) => dispatch => {
  let items = [];
  if (!!sessionStorage.getItem('bag_items')) {
    items = JSON.parse(sessionStorage.getItem('bag_items'));
  }
  if (list && list.length) {
    items = list;
  }
  sessionStorage.setItem('bag_items', JSON.stringify(items));
  dispatch(setItems(items));
};

export const setBagItem = (data) => dispatch => {
  let items = [];
  if (!!sessionStorage.getItem('bag_items')) {
    items = JSON.parse(sessionStorage.getItem('bag_items'));
  }
  items.push(data)
  sessionStorage.setItem('bag_items', JSON.stringify(items));
  dispatch(setItems(items));
};

export const unsetBagItem = (owner, product) => dispatch => {
  let items = [];
  if (!!sessionStorage.getItem('bag_items')) {
    items = JSON.parse(sessionStorage.getItem('bag_items'));
  }
  _.remove(items, (o) => o.owner === owner && o.product === product)
  sessionStorage.setItem('bag_items', JSON.stringify(items));
  dispatch(setItems(items));
};

export const bagItemsOG = state => state.bag.items;

export const bagItems = state => {
  let itemsByOwner = _.groupBy(state.bag.items, (i) => i.owner);
  _.forEach(itemsByOwner, (value, key) => {
    itemsByOwner[key] = _.groupBy(itemsByOwner[key], (i) => i.product);
  })
  return itemsByOwner;
};

export const bagItemsCount = state => {
  return _.chain(state.bag.items).groupBy((i) => i.itemId).toPairs().value().length;
};

export default bagSlice.reducer;
