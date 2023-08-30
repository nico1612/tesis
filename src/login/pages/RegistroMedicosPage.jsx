import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, startRegisterMedico } from "../../store";
import { useError, useForm } from "../../hooks";
import { checkFormLogin, checkFormRegister } from "../helpers";
import { ApellidoLabel, ApellidoText, ButtonRegistrar, LicenciaInput, RegistroText, TienesCuenta, correoText, inputCorreo, licenciaText, noTienesCuenta, nombreLabel, nombreText, passwordLabel, passwordText, registrete } from "../estilos/estiloMedico";

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
    <div className="container" >
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 style={registrete} className="fw-bold text-center mb-5">Regístrate</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              Usuario ya registrado
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className={`mb-3 ${errorName ? "has-error" : ""}`}>
              <label style={nombreText} className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errorName ? "is-invalid" : ""}`}
                name="Name"
                value={Name}
                onChange={onInputChange}
                style={nombreLabel}
              />
              {errorName && <div className="invalid-feedback">Nombre es requerido</div>}
            </div>

            <div className={`mb-3 ${errorSurname ? "has-error" : ""}`}>
              <label style={ApellidoText} className="form-label">Apellido</label>
              <input
                type="text"
                className={`form-control ${errorSurname ? "is-invalid" : ""}`}
                name="Surname"
                value={Surname}
                onChange={onInputChange}
                style={ApellidoLabel}
              />
              {errorSurname && <div className="invalid-feedback">Apellido es requerido</div>}
            </div>

            <div className={`mb-3 ${errorMail ? "has-error" : ""}`}>
              <label style={correoText} className="form-label">Mail</label>
              <input
                type="email"
                className={`form-control ${errorMail ? "is-invalid" : ""}`}
                name="Email"
                value={Email}
                onChange={onInputChange}
                style={inputCorreo}
              />
              {errorMail && <div className="invalid-feedback">Mail es requerido</div>}
            </div>

            <div className={`mb-3 ${errorPassword ? "has-error" : ""}`}>
              <label style={passwordText} className="form-label">Password</label>
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

            <div className={`mb-3 ${ErrorLicencia ? "has-error" : ""}`}>
              <label style={licenciaText} className="form-label">Licencia</label>
              <input
                type="text"
                className={`form-control ${ErrorLicencia ? "is-invalid" : ""}`}
                name="Licencia"
                value={Licencia}
                onChange={onInputChange}
                style={LicenciaInput}
              />
              {ErrorLicencia && <div className="invalid-feedback">Licencia es requerida</div>}
            </div>

            <div className="d-grid">
              <button style={ButtonRegistrar} type="submit" className="btn btn-primary" >
                Registrarse 
              </button>
            </div>
          </form>

          <div style={noTienesCuenta} className="my-3 text-center">
            <span>¿Ya tienes cuenta? </span> <Link to="/auth/login">Iniciar sesión</Link>
          </div>

          <div style={TienesCuenta} className="text-center">
            <span>Registro paciente </span> <Link to="/auth/register">Registrarse</Link>
          </div>
        </div>
      </div>
    </div>
  );
};