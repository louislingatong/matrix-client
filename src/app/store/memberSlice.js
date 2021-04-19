import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
  data: {}
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMemberList: (state, action) => {
      state.list = action.payload;
    },
    setMemberData: (state, action) => {
      state.data = action.payload;
    },
  }
});

export const {setMemberList, setMemberData} = memberSlice.actions;

export const resetUser = () => dispatch => {
  dispatch(setMemberList([]));
  dispatch(setMemberData({}));
};

export const memberList = state => state.member.list;

export const memberData = state => state.member.data;

export default memberSlice.reducer;
