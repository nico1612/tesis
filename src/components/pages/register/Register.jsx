import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import "./register.css"

import { checkFormLogin } from "../../helpers/checkFormLogin"
import { setError, startRegister } from "../../../store"
import { useError, useForm } from "../../../hooks"
import { checkFormRegister } from "../../helpers/checkFormRegister"

const formData = {
  Email: "",
  Surname: "",
  Name: "",
  Password: "",
}

export const Register = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = () => {
    setIsChecked(!isChecked)
  }

  const dispatch = useDispatch()
  const { Email, Name, Surname, Password, onInputChange } = useForm(formData)

  const { error } = useSelector((state) => state.auth)

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

    if (
      checkFormRegister({ Name, Surname, setErrorName, setErrorSurname }) &&
      checkFormLogin({ Email, Password, setErrorMail, setErrorPassword }) &&
      isChecked
    ) {
      dispatch(startRegister({ Email, Password, Name, Surname }))
    }
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="fw-bold text-center mb-5">Regístrate</h2>
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
              className={`form-control ${errorName ? "is-invalid" : ""}`}
              name="Name"
              value={Name}
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

          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={handleOnChange}
            />
            <label htmlFor="terms">
              <Link to="/auth/register/terminos">Acepto términos y condiciones</Link>
            </label>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>

          <div className="my-3 text-center">
            <span>¿Ya tienes cuenta? <Link to="/auth/iniciar-sesion">Iniciar sesión</Link></span>
          </div>

          <div className="text-center">
            <span>Registro médico <Link to="/auth/medico">Registrarse</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}
