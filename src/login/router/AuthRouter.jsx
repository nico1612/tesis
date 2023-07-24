import { Navigate, Route, Routes } from "react-router-dom"

import { HomePage, LoginPage, RegisterMedicosPage, RegisterPage } from "../pages"
import { Footer, Navbar } from "../components"

export const AuthRouter=()=>{
    return(
        <>
            <Navbar/>
            <Routes >
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/medico" element={<RegisterMedicosPage/>}/>

                <Route path="/*" element={<Navigate to="/auth"/>}/>
            </Routes>
            <Footer/>
        </>
    )
}