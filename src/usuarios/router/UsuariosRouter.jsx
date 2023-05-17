import { Navigate, Route, Routes } from "react-router-dom"

import {HomePage } from "../pages/HomePage"

export const UsuariosRouter=()=>{
    return(
        <Routes>
            <Route path="login" element={<HomePage/>}/>
          

            <Route path="/*" element={<Navigate to="/auth/login"/>}/>
        </Routes>
    )
}