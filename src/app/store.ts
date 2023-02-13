import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'

import basicReducer from '@/features/basicSlice'
import counterReducer from '@/features/counterSlice'

const reducers = combineReducers({
  basic: basicReducer,
  counter: counterReducer,
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: storage,
  },
  reducers,
)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
