import { Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"

import { AuthRouter } from "../authRouter/AuthRouter"
import { MedicoRouter } from "../medicoRouter/MedicoRouter"
import { AdminRoute } from "../adminRouter/AdminRouter"
import { UsuariosRouter } from "../usuariosRouter/UsuariosRouter"

export const AppRouter = () => {
  const { status, rol } = useSelector((state) => state.auth)
console.log(status,rol)
  return (
    <div style={{backgroundColor: "#e3e3e3"}}>
       <Routes >
      {status === "authenticated" ? (
        <>
          {rol === "PACIENTE_ROLE" && <Route path="/*" element={<UsuariosRouter />} />}
          {rol === "MEDICO_ROLE" && <Route path="/*" element={<MedicoRouter />} />}
          {rol=== "ADMIN_ROLE" && <Route path="/*" element={<AdminRoute/>}/>}
        </>
      ) : (
        <Route path="/*" element={<AuthRouter />} />
      )}
    </Routes>

    </div>
  )
}