import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RiUserLine, RiUserSearchLine } from 'react-icons/ri'
import { sidebar } from '../estilos/componentes'

export const Sidebar = () => {
  return (
    <nav style={sidebar} className="sidebar">
      <div className="sidebar-header">
        <Link className="navbar-brand" to="/">
        Administrador
        </Link>
      </div>
      <ul className="list-group list-group-flush">
        <li style={{background: "#07D2FE"}} className='list-group-item'>
          <Link className="nav-link" to="/pacientes">
            <RiUserLine size={20} /> Pacientes
          </Link>
        </li>
        <li style={{background: "#07D2FE"}} className="list-group-item">
          <Link className="nav-link" to="/medicos">
            <RiUserSearchLine size={20} /> Médicos
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
      </div>
    </nav>
  )
}