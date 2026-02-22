import axios from "axios"
import { setActivePaciente, setPacientes } from "./usuariosSlice"

const url=import.meta.env.VITE_APP_IP

export const startGettingpacientes=()=>{

    return async (dispatch, getState) => {

        const { token } = getState().auth

        const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
        }

        const response = await axios(`${url}/api/pacientes/`, options)
        const {usuarios}=response.data
     
        dispatch( setPacientes(usuarios))
        dispatch(setActivePaciente())
    }

}

export const putUsuario = ({ paciente }) => {
  return async (dispatch, getState) => {

    const { token } = getState().auth

    const id = paciente.uid

    await axios.put(
      `${url}/api/pacientes/${id}`,
      { usuarios: paciente },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    )
  }
}
