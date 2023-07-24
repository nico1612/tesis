
//import {HomePage, HistorialPage, ChatPage, BuscarPage } from "../pages"
//import { Footer, Navbar } from "../components"

import { Navigate, Route, Routes } from "react-router-dom"

import { BuscarPage, ChatPage, HistorialPage, HomePage } from "../pages"
import { Footer, Navbar } from "../components"

export const MedicoRouter=()=>{
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path="home" element={<HomePage/>}/>
                <Route path="historial" element={<HistorialPage/>}/>
                <Route path="chat" element={<ChatPage/>}/>
                <Route path="buscar" element={<BuscarPage/>}/>


                <Route path="/*" element={<Navigate to="/home"/>}/>
            </Routes>
            <Footer/>
        </>
    )
}