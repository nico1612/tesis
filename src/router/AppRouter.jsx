import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { AuthRouter } from "../login";
import { UsuariosRouter } from "../usuarios/router/UsuariosRouter";
import { MedicoRouter } from "../../medico/router/MedicoRouter";
//import { ControlGastosRouter } from "../controlDeGastos";


export const AppRouter = () => {

  const {status,rol} =useSelector(state=>state.auth)
  
  return (
        <Routes>

            {
            (status === 'authenticated')
                ?(rol==="PACIENTE_ROLE")
                ? <Route path="/*" element={ <UsuariosRouter/> } />
                :(rol==="MEDICO_ROLE")
                ?<Route path="/*" element={ <MedicoRouter/> } /> 
                :<Route path="/*" element={ <UsuariosRouter/> } />
                :<Route path="/medico/*" element={<AuthRouter/>}/>
            }

            <Route path='/*' element={ <Navigate to='/auth/' />  } />

        </Routes>
    )
}