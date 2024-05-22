import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import {authReducer} from './slices/authSlices'
import storage from 'redux-persist/lib/storage'

export type RootReducer = ReturnType<typeof reducers>

export const reducers = combineReducers({
  auth: authReducer
})

const persistConfig = {
  key: 'root',
  storage
}

export const persistedReducer = persistReducer<RootReducer>(
  persistConfig,
  reducers
)