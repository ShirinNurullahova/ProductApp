
import {
  PayloadAction,
  createSelector,
  createSlice
} from '@reduxjs/toolkit'
import { RootState } from '../store'




export type Auth = {
  authorized: boolean;
}

const initialState: Auth = {
  authorized: false
}



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload
    }
  }
})

export const {setAuthorized } = authSlice.actions

const selectSelf = (state: RootState) => state.auth





export const selectIsAuthorized = createSelector(selectSelf, (auth) => {
  return auth.authorized
})



export const authReducer = authSlice.reducer