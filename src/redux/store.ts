import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import {
  persistStore,
} from 'redux-persist'

import { persistedReducer } from './reducers'

export const store = configureStore({
  reducer: persistedReducer,
 
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector