import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../../store'

export const HeaderMedico = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(startLogout())
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/home">Dermitection</Link>
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
            <Link className="nav-link" to="/doctor-requests">Solicitud de Pacientes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/doctor-patients">Pacientes que Trata</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={logout} to="/logout">Cerrar Sesión</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
