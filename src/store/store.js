import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { medicosSlice } from "./medicos";
import { pacientesSlice } from "./usuarios/usuariosSlice";


export default configureStore({
  reducer: {
    auth:authSlice.reducer,
    medico:medicosSlice.reducer,
    paciente:pacientesSlice.reducer
  },
})