import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { startLogin, setError } from "../../store/";
import { useError, useForm } from "../../hooks";
import { checkFormLogin } from "../helpers";

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h1 className="fw-bold text-center mb-5">Bienvenido a Dermi Solution</h1>
          {error && (
            <div className="alert alert-danger" role="alert">
              Usuario y/o contraseña incorrectas
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className={`mb-3 ${errorMail ? "has-error" : ""}`}>
              <label className="form-label">Mail</label>
              <input
                type="email"
                className={`form-control ${errorMail ? "is-invalid" : ""}`}
                name="Email"
                value={Email}
                onChange={onInputChange}
              />
              {errorMail && <div className="invalid-feedback">Mail es requerido correctamente</div>}
            </div>

            <div className={`mb-3 ${errorPassword ? "has-error" : ""}`}>
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errorPassword ? "is-invalid" : ""}`}
                name="Password"
                value={Password}
                onChange={onInputChange}
              />
              {errorPassword && <div className="invalid-feedback">Contraseña es requerida</div>}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Iniciar sesión
              </button>
            </div>
          </form>

          <div className="my-3 text-center">
            <span>No tienes cuenta? </span> <Link to={"/auth/register"}>Registrarse</Link>
          </div>

          <div className="text-center">
            <span>Registro médico </span> <Link to={"/auth/medico"}>Registrarse</Link>
          </div>
        </div>
      </div>
    </div>
  );
};