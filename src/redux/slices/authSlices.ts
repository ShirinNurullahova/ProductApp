import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Auth = {
  authorizedUser?: User;
};

const initialState: Auth = {
  authorizedUser: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizedUser: (state, action: PayloadAction<User>) => {
      state.authorizedUser = action.payload;
    },
    logout: (state) => {
      state.authorizedUser = undefined;
    },
  },
  
});

export const { setAuthorizedUser, logout } = authSlice.actions;

const selectSelf = (state: RootState) => state.auth;

export const selectAuthorizedUser = createSelector(selectSelf, (auth) => auth.authorizedUser);

export const authReducer = authSlice.reducer;
