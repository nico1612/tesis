import axios from "axios"
import { setMedicos } from "./medicosSlice"

const url = import.meta.env.VITE_APP_IP

export const startGettingMedicos = () => {
  return async (dispatch, getState) => {

    const { token } = getState().auth

    const { data } = await axios.get(`${url}/api/medico/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const { medicos } = data
    dispatch(setMedicos(medicos))
  }
}

export const putMedicos = ({ medico }) => {
  return async (dispatch, getState) => {

    const { token } = getState().auth
    const id = medico.uid

    await axios.put(
      `${url}/api/medico/${id}`,
      { medico },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    )
  }
}
