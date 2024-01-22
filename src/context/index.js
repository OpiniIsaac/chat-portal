import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import groupSlice from "./actionslice";
const store = configureStore({
     reducer:{
          auth: authSlice.reducer,
          group:groupSlice.reducer
     }
})

export default store