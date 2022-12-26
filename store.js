import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from './slices/CounterSlice'
 

 

export default   configureStore({
  reducer: {
    counter:CounterReducer,
  },
})