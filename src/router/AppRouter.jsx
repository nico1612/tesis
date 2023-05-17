import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { AuthRouter } from "../login";
import { UsuariosRouter } from "../usuarios/router/UsuariosRouter";
//import { ControlGastosRouter } from "../controlDeGastos";


export const AppRouter = () => {

  const {status} =useSelector(state=>state.auth)
  
  return (
        <Routes>

            {
            (status === 'authenticated')
                ? <Route path="/*" element={ <UsuariosRouter/> } />
                : <Route path="/auth/*" element={ <AuthRouter/> } />
            }

            <Route path='/*' element={ <Navigate to='/auth/login' />  } />

        </Routes>
    )
}