import axios from "axios";
import { setMedicos, updateMedicos } from "./medicosSlice"

export const startGettingMedicos=()=>{

    return async (dispatch)=>{

        
        const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        };

        const {data} = await axios("http://localhost:8080/api/medico/", options);
        //console.log(data)
        const {medicos} =data

        dispatch( setMedicos(medicos))
    }

}

export const putMedicos=({ medico})=>{

    return async (dispatch)=>{

        
        const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
        };
        updateMedicos({ medico })
        const {data} = await axios("http://localhost:8080/api/medico/", options);
        console.log(data)
        //const {medicos} =data

        //dispatch( setMedicos(medicos))
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

       await axios("http://localhost:8080/api/medico/", options);
       

        dispatch( updateMedicos(medico))*/
    }
   
}