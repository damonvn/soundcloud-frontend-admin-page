import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
   isAuthenticated: false,
   user: {
      email: '',
      name: '',
      role: '',
   },
};

export const accountSlice = createSlice({
   name: 'account',
   initialState,
   reducers: {
      doLoginAction: (state, action) => {
         state.isAuthenticated = true;
         state.user = action.payload;
      },
      doGetAccountAction: (state, action) => {
         state.isAuthenticated = true;
         state.user = action.payload;
      },
      doLogoutAction: (state) => {
         localStorage.removeItem('access_token');
         state.isAuthenticated = false;
         state.user = {
            email: '',
            name: '',
            role: '',
         };
      },
      doUpdateUserInfoAction: (state, action) => {
         state.user.avatar = action.payload.avatar;
         state.user.phone = action.payload.phone;
         state.user.fullName = action.payload.fullName;
      },
   },
});

export const { doLoginAction, doGetAccountAction, doLogoutAction, doUpdateUserInfoAction } =
   accountSlice.actions;

export default accountSlice.reducer;
