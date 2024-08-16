import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useError, useForm } from "../../../hooks"
import { setError, startRegisterMedico } from "../../../store"

const formData = {
  Email: "",
  Surname: "",
  Name: "",
  Password: "",
  Licencia: "",
}

export const RegisterMedicos = () => {
  const dispatch = useDispatch()
  const { Email, Name, Surname, Password, Licencia, onInputChange } = useForm(formData)
  const { error } = useSelector((state) => state.auth)
  const [ErrorLicencia, setErrorLicencia] = useState(false)

  const {
    errorMail,
    errorPassword,
    errorName,
    errorSurname,
    setErrorMail,
    setErrorPassword,
    setErrorName,
    setErrorSurname,
  } = useError()

  useEffect(() => {
    if (error) {
      dispatch(setError())
    }
  }, [error, dispatch])

  const onSubmit = (event) => {
    event.preventDefault()

    if (Licencia.trim() === "") {
      setErrorLicencia(true)
    } else {
      setErrorLicencia(false)
    }

    if (
      checkFormRegister({ Name, Surname, setErrorName, setErrorSurname }) &&
      !ErrorLicencia &&
      checkFormLogin({ Email, Password, setErrorMail, setErrorPassword })
    ) {
      dispatch(startRegisterMedico({ Email, Password, Name, Surname, Licencia }))
    }
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="fw-bold text-center mb-5">Regístrate médico</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            Usuario ya registrado
          </div>
        )}
        <form className="form-card" onSubmit={onSubmit}>
          <div className={`form-group ${errorName ? "has-error" : ""}`}>
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="Name"
              value={Name}
              className={`form-control ${errorName ? "is-invalid" : ""}`}
              onChange={onInputChange}
            />
            {errorName && <div className="invalid-feedback">Nombre es requerido</div>}
          </div>

          <div className={`form-group ${errorSurname ? "has-error" : ""}`}>
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

          <div className={`form-group ${errorMail ? "has-error" : ""}`}>
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

          <div className={`form-group ${errorPassword ? "has-error" : ""}`}>
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

          <div className={`form-group ${ErrorLicencia ? "has-error" : ""}`}>
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
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>

          <div className="my-3 text-center">
            <span>¿Ya tienes cuenta? </span> <Link to="/auth/iniciar-sesion">Iniciar sesión</Link>
          </div>

          <div className="text-center">
            <span>Registro paciente </span> <Link to="/auth/register">Registrarse</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
