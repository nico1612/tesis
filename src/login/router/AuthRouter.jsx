import { Navigate, Route, Routes } from "react-router-dom"

import { LoginPage, RegisterPage } from "../pages"
import { HomePage } from "../pages/HomePage"
import { Footer, Navbar } from "../components"

export const AuthRouter=()=>{
    return(
        <body className=''>
            <Navbar/>
            <Routes >
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>

                <Route path="/*" element={<Navigate to="/auth/"/>}/>
            </Routes>
            <Footer/>
        </body>
    )
}