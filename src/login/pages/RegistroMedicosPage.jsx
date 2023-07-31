import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startRegister, setError, startRegisterMedico } from "../../store";
import { useError, useForm } from "../../hooks";
import { checkFormLogin, checkFormRegister } from "../helpers";

const formData = {
  Email: "",
  Surname: "",
  Name: "",
  Password: "",
  Licencia: "",
};

export const RegisterMedicosPage = () => {
  const dispatch = useDispatch();
  const {
    Email,
    Name,
    Surname,
    Password,
    Licencia,
    onInputChange,
  } = useForm(formData);
  const { error } = useSelector((state) => state.auth);
  const [ErrorLicencia, setErrorLicencia] = useState(false);

  const {
    errorMail,
    errorPassword,
    errorName,
    errorSurname,
    setErrorMail,
    setErrorName,
    setErrorPassword,
    setErrorSurname,
  } = useError();

  useEffect(() => {
    if (error) {
      dispatch(setError());
    }
  }, [error, dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (ErrorLicencia === "") {
      setErrorLicencia(true);
    } else {
      setErrorLicencia(false);
    }

    if (
      checkFormRegister({
        Name,
        Surname,
        setErrorName,
        setErrorSurname,
      }) &&
      !ErrorLicencia &&
      checkFormLogin({
        Email,
        Password,
        setErrorMail,
        setErrorPassword,
      })
    ) {
      console.log({ Email, Password, Name, Surname, Licencia })
      dispatch(startRegisterMedico({ Email, Password, Name, Surname, Licencia }));
    }
    console.log({ errorName, errorMail, errorPassword, errorSurname,ErrorLicencia })
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="fw-bold text-center mb-5">Regístrate como médico</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              Usuario ya registrado
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className={`mb-3 ${errorName ? "has-error" : ""}`}>
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errorName ? "is-invalid" : ""}`}
                name="Name"
                value={Name}
                onChange={onInputChange}
              />
              {errorName && <div className="invalid-feedback">Nombre es requerido</div>}
            </div>

            <div className={`mb-3 ${errorSurname ? "has-error" : ""}`}>
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className={`form-control ${errorSurname ? "is-invalid" : ""}`}
                name="Surname"
                value={Surname}
                onChange={onInputChange}
              />
              {errorSurname && <div className="invalid-feedback">Apellido es requerido</div>}
            </div>

            <div className={`mb-3 ${errorMail ? "has-error" : ""}`}>
              <label className="form-label">Mail</label>
              <input
                type="email"
                className={`form-control ${errorMail ? "is-invalid" : ""}`}
                name="Email"
                value={Email}
                onChange={onInputChange}
              />
              {errorMail && <div className="invalid-feedback">Mail es requerido</div>}
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
              <span id="passwordHelpInline" className="form-text">
                Debe tener 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.
              </span>
              {errorPassword && <div className="invalid-feedback">Contraseña es requerida</div>}
            </div>

            <div className={`mb-3 ${ErrorLicencia ? "has-error" : ""}`}>
              <label className="form-label">Licencia</label>
              <input
                type="text"
                className={`form-control ${ErrorLicencia ? "is-invalid" : ""}`}
                name="Licencia"
                value={Licencia}
                onChange={onInputChange}
              />
              {ErrorLicencia && <div className="invalid-feedback">Licencia es requerida</div>}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary" >
                Registrarse
              </button>
            </div>
          </form>

          <div className="my-3 text-center">
            <span>¿Ya tienes cuenta? </span> <Link to="/auth/login">Iniciar sesión</Link>
          </div>

          <div className="text-center">
            <span>Registro persona </span> <Link to="/auth/register">Registrarse</Link>
          </div>
        </div>
      </div>
    </div>
  );
};