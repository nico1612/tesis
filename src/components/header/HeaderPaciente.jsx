import { Link } from "react-router-dom"
import "./headerPaciente.css"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store"

export const HeaderPaciente = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(startLogout())
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/homePaciente">DERMITECTION</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/imagenes">Imágenes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/medicos">Médicos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={logout} to="/logout">Cerrar Sesión</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
