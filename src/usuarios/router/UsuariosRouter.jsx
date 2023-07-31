import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage, HistorialPage ,ChatPage, BuscarPage, DatoPage } from "../pages"
import { Footer, Navbar, Sidebar } from "../components"

export const UsuariosRouter = () => {
  return (
    <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ padding: "20px", flexGrow: 1 }}>
      <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="historial" element={<HistorialPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="buscar" element={<BuscarPage />} />
            <Route path="dato" element={<DatoPage />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}