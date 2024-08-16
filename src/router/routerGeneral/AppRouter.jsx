import { Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"

import { AuthRouter } from "../authRouter/AuthRouter"
import { MedicoRouter } from "../medicoRouter/MedicoRouter"
import { AdminRoute } from "../adminRouter/AdminRouter"
import { UsuariosRouter } from "../usuariosRouter/UsuariosRouter"

export const AppRouter = () => {
  const { status, rol } = useSelector((state) => state.auth)

  return (
    <div style={{backgroundColor: "#fcd1c6"}}>
       <Routes >
      {status === "authenticated" ? (
        <>
          {rol === "PACIENTE_ROLE" && <Route path="/*" element={<UsuariosRouter />} />}
          {rol === "MEDICO_ROLE" && <Route path="/*" element={<MedicoRouter />} />}
          {rol=== "ADMIN_ROLE" && <Route path="/*" element={<AdminRoute/>}/>}
        </>
      ) : (
        <Route path="/auth/*" element={<AuthRouter />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/" />} />
    </Routes>

    </div>
  )
}