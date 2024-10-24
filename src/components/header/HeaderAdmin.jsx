import React from "react" 
import { useDispatch } from "react-redux" 
import { Link } from "react-router-dom" 
import { startLogout } from "../../store/auth/thunks" 
import "./HeaderAdmin.css" 
import { Logo } from "./logo"

export const HeaderAdmin = () => {
  const dispatch = useDispatch() 

  const logout = () => {
    dispatch(startLogout()) 
  } 

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Logo/>
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
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/pacientes">Pacientes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/medicos">Médicos</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-primary logout-button" onClick={logout}>
              Logout
            </button>
          </li>
          <li className="nav-item" style={{backgroundColor:'black'}}>
            <button className="btn btn-primary logout-button" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  ) 
} 
