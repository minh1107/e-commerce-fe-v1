import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app/appSlice'
import productSlice from './product/productSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import userSlice from './user/userlice'

const commonConfig = {
  key: 'shop/user',
  storage
}

const useConfig = {
  ...commonConfig, 
  whitelist: ['isLoggedIn', 'token']
}

export const store = configureStore({
  reducer: {
    appReducer: appSlice,
    productReducer: productSlice,
    userReducer: persistReducer(useConfig, userSlice)
  },
})

export const persistor = persistStore(store)