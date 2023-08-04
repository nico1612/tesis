import axios from "axios";
import { setMedicos, updateMedicos } from "./medicosSlice"

const url=import.meta.env.VITE_APP_IP

export const startGettingMedicos=()=>{

    return async (dispatch)=>{

        
        const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        };

        const {data} = await axios(`${url}/api/medico/`, options);
        //console.log(data)
        const {medicos} =data

        dispatch( setMedicos(medicos))
    }

}

export const putMedicos=({ medico})=>{

    return async (dispatch)=>{

        console.log(medico)
        const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            data:{"medico":medico}
        };

        const id=medico.uid
       
        await axios(`${url}/api/medico/${id}`, options);
        
    }

}
export const cambiarEstado=({medico})=>{

    return async (dispatch)=>{
      
       dispatch(updateMedicos(medico))
        console.log(medico.estado)
        /* const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data:{"medico":medico}
        };

       await axios(`${url}/api/medico/`, options);
       

        dispatch( updateMedicos(medico))*/
    }
   
}