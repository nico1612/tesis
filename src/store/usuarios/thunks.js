import axios from "axios";
import { setActivePaciente, setPacientes } from "./usuariosSlice";

const url=import.meta.env.VITE_APP_IP

export const startGettingpacientes=()=>{

    return async (dispatch)=>{

        const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        };

        const response = await axios(`${url}/api/pacientes/`, options);
        const {usuario}=response.data
        console.log(usuario)
        dispatch( setPacientes(usuario))
        dispatch(setActivePaciente())
    }

}

export const putUsuario=({ paciente})=>{

    return async (dispatch)=>{

        const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            data:{"usuarios":paciente}
        };

        const id=paciente.uid
       
        await axios(`${url}/api/pacientes/${id}`, options);
        
    }

}