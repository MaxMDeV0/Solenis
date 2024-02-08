import { configureStore } from '@reduxjs/toolkit'
import { requestSlice } from './requestSlice'
import counterReducer from './counterSlice'

export default configureStore({
  reducer: {
    solenis: counterReducer,
    'requestApi':requestSlice.reducer

  },
  middleware : (getDefaultMiddleware) =>{
    return getDefaultMiddleware().concat(requestSlice.middleware)
  }
})