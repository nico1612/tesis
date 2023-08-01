import { Navigate, Route, Routes } from "react-router-dom"
import { Footer, Navbar } from "../components"
import { AdminMedicosPages, AdminPacientesPages, HomePage } from "../pages"
import { Modificar } from "../pages/Modificar"
import { ModificarPaciente } from "../pages/modificarPaciente"

//import { HomePage, LoginPage, RegisterMedicosPage, RegisterPage } from "../pages"

export const AdminRoute=()=>{
    return(
        <>
            <Navbar/>
            <Routes >
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/pacientes" element={<AdminPacientesPages/>}/>
                <Route path="/pacientes/:paciente" element={<ModificarPaciente/>}/>
                <Route path="/medicos" element={<AdminMedicosPages/>}/>
                <Route path="/medicos/:medico" element={<Modificar/>}/>
                <Route path="/*" element={<Navigate to="/home"/>}/>
            </Routes>
            <Footer/>
        </>
    )
}