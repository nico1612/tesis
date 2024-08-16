import { Navigate, Route, Routes } from "react-router-dom"
import { HomePaciente } from "../../components/pages/homePaciente/HomePaciente"
import { HeaderPaciente } from "../../components/header/HeaderPaciente"
import "./usuariosRouter.css"
import { ImagenesUsuarios } from "../../components/pages/imagenes/ImagenesUsuarios"
import { MedicosYSolicitud } from "../../components/pages/vistaPacienteParaMedico/MedicosYSolicitud"
import { DatoPage } from "../../components/datosPacientes/DatosPage"
import { Footer } from "../../components/footer/Footer"


export const UsuariosRouter = () => {

  return (
    <div className="layout">
      <HeaderPaciente />
      <DatoPage />
      <div className="content">
        <Routes>
          <Route path="home" element={<HomePaciente />} />
          <Route path="/*" element={<Navigate to="/home" />} />
          <Route path="/imagenes" element={<ImagenesUsuarios />} />
          <Route path='/medicos' element={<MedicosYSolicitud />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
