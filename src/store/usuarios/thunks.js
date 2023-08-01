import axios from "axios";
import { setActivePaciente, setPacientes } from "./usuariosSlice";

export const startGettingpacientes=()=>{

    return async (dispatch)=>{

        const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        };

        const response = await axios("http://localhost:8080/api/usuarios/", options);
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
       
        await axios(`http://localhost:8080/api/usuarios/${id}`, options);
        
    }

}