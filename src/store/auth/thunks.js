import axios from "axios";
import { checkingCredentials, login, logout, setError } from "./authSlice";

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

    const response = await axios("http://localhost:8080/api/auth/login", options);

    if (response.data.ok) {
      const { data } = response;
      console.log(data);
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

    const response = await axios("http://localhost:8080/api/usuarios", options);
    console.log(response)
    if (response.statusText==='OK') {
      dispatch(startLogin({ Email, Password }));
    } else {
      dispatch(logout(response.data.ok));
      dispatch(setError());
    }
    console.log({ Email, Password, Name, Surname });
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

    console.log(options);
    await axios("http://localhost:8080/api/medico", options);
  } catch (error) {
    console.error(error);
  }
};

export const startLogout = () => (dispatch) => {
  dispatch(logout());
};