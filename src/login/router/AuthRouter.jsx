import { Navigate, Route, Routes } from "react-router-dom"

import { HomePage, LoginPage, RegisterPage } from "../pages"
import { Footer, Navbar } from "../components"
import { RegisterMedicosPage } from "../pages/RegistroMedicospage"

export const AuthRouter=()=>{
    return(
        <body className=''>
            <Navbar/>
            <Routes >
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="medico" element={<RegisterMedicosPage/>}/>

                <Route path="/*" element={<Navigate to="/auth"/>}/>
            </Routes>
            <Footer/>
        </body>
    )
}