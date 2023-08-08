import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage, HistorialPage ,ChatPage, BuscarPage, DatoPage, ChatMedico, MedicosRelaciones } from "../pages"
import { useSelector } from "react-redux";
import { Footer, Navbar } from "../../componentes";
import { Sidebar } from "../components/Sidebar";

export const UsuariosRouter = () => {
  const { name } = useSelector((state) => state.auth);

  return (
    <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Navbar rol={"paciente"} nombre={name}  />
      <div style={{ padding: "20px", flexGrow: 1 }}>
      <Routes>
            <Route path="home" element={<HomePage  />} />
            <Route path="historial" element={<HistorialPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:medico" element={<ChatMedico/>} />
            <Route path="buscar" element={<BuscarPage />} />
            <Route path="dato" element={<DatoPage />} />
            <Route path="relaciones" element={<MedicosRelaciones />}/>
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </div>
  );
}