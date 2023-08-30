import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { startLogin, setError } from "../../store/";
import { useError, useForm } from "../../hooks";
import { checkFormLogin } from "../helpers";
import {labelCorreo,textoIniciarsesion,PasswordText,passwordLabel,Iniciarsesion,registroMedico,Registro, correoText } from "../estilos/estilosLogin";
const formData = {
  Email: "",
  Password: ""
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { Email, Password, onInputChange } = useForm(formData);

  const { errorMail, setErrorMail, errorPassword, setErrorPassword } = useError();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      dispatch(setError());
    }
  }, [error, dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (checkFormLogin({ Email, Password, setErrorMail, setErrorPassword })) {
      dispatch(startLogin({ Email, Password }));
    }
  };

  return (
    <div className="container" >
      <div >
        <div >
          <div >
          {error && (
            <div className="alert alert-danger" role="alert">
              Usuario y/o contraseña incorrectas
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className={`mb-3 ${errorMail ? "has-error" : ""}`}>
              <label style={correoText} className="form-label">Mail</label>
              <input style={labelCorreo}
                type="email"
                className={`form-control ${errorMail ? "is-invalid" : ""}`}
                name="Email"
                value={Email}
                onChange={onInputChange}
              />
              {errorMail && <div className="invalid-feedback">Mail es requerido correctamente</div>}
            </div>

            <div className={`mb-3 ${errorPassword ? "has-error" : ""}`}>
              <label className="form-label" style={PasswordText}>Password</label>
              <input
                type="password"
                className={`form-control ${errorPassword ? "is-invalid" : ""}`}
                name="Password"
                value={Password}
                onChange={onInputChange}
                style={passwordLabel}
              />
              {errorPassword && <div className="invalid-feedback">Contraseña es requerida</div>}
            </div>

            <div className="d-grid">
              <button style={Iniciarsesion} type="submit">
                <p style={textoIniciarsesion}>Iniciar sesión </p>
                
              </button>
            </div>
          </form>

          <div style={Registro} className="my-3 text-center">
            <span>No tienes cuenta? </span> <Link to="/auth/register">Registrarse</Link>
          </div>

          <div style={registroMedico} className="text-center">
            <span>Registro médico </span> <Link to="/auth/medico">Registrarse</Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
