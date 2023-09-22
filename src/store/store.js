import { configureStore } from "@reduxjs/toolkit"
import { medicosSlice } from "./medicos"
import { pacientesSlice } from "./usuarios"
import { authSlice } from "./auth"

export default configureStore({
  reducer: {
    auth:authSlice.reducer,
    medico:medicosSlice.reducer,
    paciente:pacientesSlice.reducer
  },
})