import { Navigate, Route, Routes } from "react-router-dom"

import { BuscarPage, ChatPage, DatoPage, HistorialPacientesPage, HistorialPage, HomePage, SolicitudesPages } from "../pages"
import { Footer, Navbar } from "../components"
import { Sidebar } from "../components/Sidebar"

export const MedicoRouter=()=>{
    return(

        <div style={{ display: "flex" }}>
            <Sidebar />
        
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Navbar />
                <div style={{ padding: "20px", flexGrow: 1 }}>
                <Routes>
                    <Route path="home" element={<HomePage/>}/>
                    <Route path="historial" element={<HistorialPage/>}/>
                    <Route path="historial/:nombre" element={<HistorialPacientesPage/>}/>
                    <Route path="chat" element={<ChatPage/>}/>
                    <Route path="buscar" element={<BuscarPage/>}/>
                    <Route path="dato" element={<DatoPage />} />
                    <Route path="solicitudes" element={<SolicitudesPages />} />

                    <Route path="/*" element={<Navigate to="/home"/>}/>
                </Routes>
                </div>
                <Footer />
            </div>
        </div>
    )
}