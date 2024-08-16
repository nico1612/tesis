import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useError, useForm } from "../../../hooks"
import { setError, startLogin } from "../../../store"
import { checkFormLogin } from "../../helpers/checkFormLogin"

const formData = {
  Email: "",
  Password: ""
}

export const IniciarSesion = () => {
  const dispatch = useDispatch()
  const { Email, Password, onInputChange } = useForm(formData)

  const { errorMail, setErrorMail, errorPassword, setErrorPassword } = useError()
  const { error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (error) {
      dispatch(setError())
    }
  }, [error, dispatch])

  const onSubmit = (event) => {
    event.preventDefault()

    if (checkFormLogin({ Email, Password, setErrorMail, setErrorPassword })) {
      dispatch(startLogin({ Email, Password }))
    }
  }

  return (
    <div className="centered-container">
      <div>
        <div>
          <div>
            {error && (
              <div className="alert alert-danger" role="alert">
                Usuario y/o contraseña incorrectas
              </div>
            )}
            <form className="border" onSubmit={onSubmit}>
              <h1>Iniciar sesión</h1>
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
              <div className="my-3 text-center">
                <span>No tienes cuenta? </span> <Link to="/auth/register">Registrarse</Link>
              </div>
              <div className="text-center">
                <span>Registro médico </span> <Link to="/auth/medico">Registrarse</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
