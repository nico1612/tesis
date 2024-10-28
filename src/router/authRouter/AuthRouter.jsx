import { Navigate, Route, Routes } from "react-router-dom"
import { TerminosYCondiciones } from "../../components/terminosYcondiciones/TerminosYcondiciones"
import { Home } from "../../components/pages/home/Home"
import { Footer } from "../../components/footer/Footer"
import "./stylesAuth.css"
import { QuienesSomos } from "../../components/pages/quienesSomos/QuienesSomos"
import { IniciarSesion } from "../../components/pages/IniciarSecion/IniciarSesion"
import { RegisterMedicos } from "../../components/pages/medicoRegister/MedicoRegister"
import { Register } from "../../components/pages/register/Register"
import { Header } from "../../components/header/Header"

export const AuthRouter = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div style={{ /* flex: 1, marginTop: '50px', marginBottom: '150px' */ }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/medico" element={<RegisterMedicos />} />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/register/terminos" element={<TerminosYCondiciones />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}