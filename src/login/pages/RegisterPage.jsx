import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startRegister, setError } from "../../store";
import { useError, useForm } from "../../hooks";
import { checkFormLogin, checkFormRegister } from "../helpers";
import { Apellido, NombreText, Registrese, RegistroBoton, checkbox, correoText, inputApellido, inputCorreo, inputNombre, inputPassword, médico, passwordText, registroText, terminosYCondiciones, tienesCuente } from "../estilos/registroPaciente";

const formData = {
  Email: "",
  Surname: "",
  Name: "",
  Password: "",
};

export const RegisterPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  const dispatch = useDispatch();
  const {
    Email,
    Name,
    Surname,
    Password,
    onInputChange,
  } = useForm(formData);

  const { error } = useSelector((state) => state.auth);

  const {
    errorMail,
    errorPassword,
    errorName,
    errorSurname,
    setErrorMail,
    setErrorPassword,
    setErrorName,
    setErrorSurname,
  } = useError();
 
  useEffect(() => {
    if (error) {
      dispatch(setError());
    }
  }, [error, dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      checkFormRegister({
        Name,
        Surname,
        setErrorName,
        setErrorSurname,
      }) &&
      checkFormLogin({
        Email,
        Password,
        setErrorMail,
        setErrorPassword,
      })
      && isChecked===true
    ) {
      dispatch(startRegister({ Email, Password, Name, Surname }));
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 style={Registrese} className="fw-bold text-center mb-5">Regístrate</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              Usuario ya registrado
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className={`mb-3 ${errorName ? "has-error" : ""}`}>
              <label style={NombreText} className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errorName ? "is-invalid" : ""}`}
                name="Name"
                value={Name}
                onChange={onInputChange}
                style={inputNombre}
              />
              {errorName && <div className="invalid-feedback">Nombre es requerido</div>}
            </div>

            <div className={`mb-3 ${errorSurname ? "has-error" : ""}`}>
              <label style={Apellido} className="form-label">Apellido</label>
              <input
                type="text"
                className={`form-control ${errorSurname ? "is-invalid" : ""}`}
                name="Surname"
                value={Surname}
                onChange={onInputChange}
                style={inputApellido}
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
                style={inputPassword}
              />
              {errorPassword && <div className="invalid-feedback">Contraseña es requerida</div>}
            </div>
            <div className="topping">
            <input
              type="checkbox"
              id="topping"
              name="topping"
              value="Paneer"
              checked={isChecked}
              onChange={handleOnChange}
              style={checkbox}
            />
            <Link to="/auth/terminos" style={terminosYCondiciones} > acepto terminos y condiciones</Link>
          </div>
            <div className="d-grid">
              <button style={RegistroBoton} type="submit">
                <p style={tienesCuente}>
                Registrarse
                </p>
                
              </button>
            </div>
          </form>

          <div  className="my-3 text-center">
            <span style={registroText}>¿Ya tienes cuenta? <Link to="/auth/login">Iniciar sesión</Link> </span>
          </div>

          <div className="text-center">
            <span style={médico} >Registro médico <Link to="/auth/medico">Registrarse</Link> </span> 
          </div>
        </div>
      </div>
    </div>
  );
};