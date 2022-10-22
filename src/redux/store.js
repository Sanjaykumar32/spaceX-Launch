import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/CreateSlice'

export const store = configureStore({
  reducer: {
    spaceXdata: counterReducer,
  },
})