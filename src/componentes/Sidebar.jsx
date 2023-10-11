import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import { FaCommentAlt, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export const Sidebar = () => {
  const { name } = useSelector((state) => state.auth)
  const bgColor = location.pathname === "/" ? "#f8f9fa" : "#007bff"
  const textColor = location.pathname === "/" ? "#000" : "#fff"

  return (
    <div  style={{ display: '1', height:"100vh",background: "#07D2FE" }} className="sidebar-container">
      <nav >
        <div className="sidebar-header">
          <Link className="navbar-brand" to="/">
            <h3 className="navbar-brand">
              <FaUser />  Médico: {name}
            </h3>
          </Link>
        </div>
        <ul className="list-group">
          <li >
            <Link to="/dato" className={`nav-link ${location.pathname === '/dato' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUser} /> Datos personales
            </Link>
          </li>
          <li>
            <Link to="/solicitudes" className={`nav-link ${location.pathname === '/solicitudes' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faFileAlt} /> Listado de solicitudes
            </Link>
          </li>
          <li >
              <Link
                className="nav-link"
                exact
                to="/historial"
                activeClassName="active"
              >
                <FaCommentAlt /> Historial
              </Link>
            </li>
            <li >
              <Link
                className="nav-link"
                exact
                to="/chat"
                activeClassName="active"
              >
                <FaCommentAlt /> Hablar con pacientes
              </Link>
            </li>
        </ul>
      </nav>
    </div>
  )
}