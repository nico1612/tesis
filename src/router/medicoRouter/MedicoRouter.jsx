import { Navigate, Route, Routes } from "react-router-dom"
import { HomeMedico } from "../../components/pages/homeMedico/HomeMedico"
import { HeaderMedico } from "../../components/header/HeaderMedico"
import { Footer } from "../../components/footer/Footer"
import { SolicitudesPacientes } from "../../components/pages/solicitudes/SolicitudesPacientes"
import { PacienteMedico } from "../../components/pages/pacientesMedico/PacientesMedico"
import { HistorialPacienteMedico } from "../../components/pages/historialPacienteMedico/HistorialPacienteMedico"

export const MedicoRouter = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HeaderMedico />
      <div style={{ flex: 1, marginTop:'50px', marginBottom:'100px' }}>
        <Routes>
          <Route path="home" element={<HomeMedico />} />
          <Route path="doctorPatients" element={<PacienteMedico />} />
          <Route path="doctorPatients/:nombre" element={<HistorialPacienteMedico />} />
          <Route path="doctorRequests" element={<SolicitudesPacientes />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
