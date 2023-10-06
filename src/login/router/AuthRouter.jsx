import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage, LoginPage, RegisterMedicosPage, RegisterPage } from "../pages"
import { Footer } from "../components"
import { Sidebar } from "../components/Sidebar"
import { DERMI, dermisolution, fondo, sideBar } from "../estilos/estilos"
import { TerminosYCondiciones } from "../pages/TerminosYcondiciones"

export const AuthRouter = () => {
  return (
    <div style={{ display: 'flex', height:"100vh",     background: "#12FFF1" }}>
      <Sidebar  />
      <div style={{ flex: 1, marginLeft: '250px', }}>
        <div style={DERMI}>
          <h4 style={dermisolution}>
            DERMI-SOLUTION
          </h4>
          
        </div>
        <Routes>
          <Route path="/" element={<HomePage style={{ marginBottom: '88px' }} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/medico" element={<RegisterMedicosPage />} />

          <Route path="/*" element={<Navigate to="/auth" />} />
          <Route path="/register/terminos" element={<TerminosYCondiciones/>}></Route>
        </Routes>
        <Footer style={{ position: "absolute", bottom: "0",width: "100%",height: "40px"}} />
      </div>
    </div>
  )
}