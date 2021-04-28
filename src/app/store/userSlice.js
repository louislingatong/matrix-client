import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
  data: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.list = action.payload;
    },
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  }
});

export const {setUserList, setUserData} = userSlice.actions;

export const resetUser = () => dispatch => {
  dispatch(setUserList([]));
  dispatch(setUserData({}));
};

export const userList = state => state.user.list;

export const userData = state => state.user.data;

export default userSlice.reducer;
