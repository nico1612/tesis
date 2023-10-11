import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage, HistorialPage ,ChatPage, BuscarPage, DatoPage, ChatMedico, MedicosRelaciones } from "../pages"
import { useSelector } from "react-redux"
import { Footer } from "../../componentes"
import { Navbar } from "../components"
import { Sidebar } from "../components/sideBar"

export const UsuariosRouter = () => {
  const { name } = useSelector((state) => state.auth)

  return (
    <div style={{ display: 'flex', height:"100vh"}}>
    <Sidebar rol={"Paciente"} nombre={name}/>
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Navbar/>
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
        <div >
        <Footer style={{ position: "absolute", bottom: "0",width: "100%",height: "40px"}}/>
        </div>
      </div>
    </div>
  )
}