import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, HistorialPage, ChatPage, BuscarPage, DatoPage, ChatMedico, MedicosRelaciones } from "../pages";
import { useSelector } from "react-redux";
import { Footer } from "../../componentes";
import { Navbar } from "../components";
import { Sidebar } from "../components/sideBar";
import './router.css'

export const UsuariosRouter = () => {
  const { name } = useSelector((state) => state.auth);

  return (
    <div className="divGeneral">
      <Sidebar rol={"Paciente"} nombre={name} />
      <div className="divRutas">
        <Navbar />
        <div className="div">
          <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="historial" element={<HistorialPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:medico" element={<ChatMedico />} />
            <Route path="buscar" element={<BuscarPage />} />
            <Route path="dato" element={<DatoPage />} />
            <Route path="relaciones" element={<MedicosRelaciones />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
}