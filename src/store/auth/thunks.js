import axios from "axios";
import { checkingCredentials, login, logout, setError } from "./authSlice";
import { clearMedicosLogout } from "../medicos/medicosSlice";
import { clearPacienteLogout } from "../usuarios/usuariosSlice";

const url=import.meta.env.VITE_APP_IP

export const startLogin = ({ Email, Password }) => async (dispatch) => {
  try {
    dispatch(checkingCredentials());
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { correo: Email, password: Password },
    };

    const response = await axios(`${url}/api/auth/login`, options);

    if (response.data.ok) {
      const { data } = response;
      dispatch(login(data));
    } else {
      dispatch(setError());
    }
  } catch (error) {
    dispatch(setError());
  }
};

export const startRegister = ({ Email, Password, Name, Surname }) => async (dispatch) => {
  try {
    dispatch(checkingCredentials());

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { nombre: Name, apellido: Surname, correo: Email, password: Password, rol: "PACIENTE_ROLE" },
    };

    const response = await axios(`${url}/api/usuarios`, options);
    if (response.statusText==='OK') {
      dispatch(startLogin({ Email, Password }));
    } else {
      dispatch(logout(response.data.ok));
      dispatch(setError());
    }
  } catch (error) {
    dispatch(setError());
  }
};

export const startRegisterMedico = ({ Email, Password, Name, Surname, Licencia }) => async () => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { nombre: Name, apellido: Surname, correo: Email, password: Password, rol: "MEDICO_ROLE", licencia: Licencia },
    };

    console.log(url)
    await axios(`${url}/api/medico`, options);
  } catch (error) {
    console.error(error);
  }
};

export const startLogout = () => (dispatch) => {
  dispatch(clearMedicosLogout())
  dispatch(clearPacienteLogout())
  dispatch(logout());
};