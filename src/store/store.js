import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { medicosSlice } from "./medicos";


export default configureStore({
  reducer: {
    auth:authSlice.reducer,
    medico:medicosSlice.reducer
  },
})