import { Navigate, Route, Routes } from "react-router-dom"

import { ChatPaciente, ChatPage, DatoPage, HistorialPacientesPage, HistorialPage, HomePage, SolicitudesPages } from "../pages"
import {  Navbar } from "../components"
import { Footer, Sidebar } from "../../componentes"


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
                    <Route path="chat/:chat" element={<ChatPaciente/>}/>
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