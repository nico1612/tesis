import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { homeSidebar, login, sideBar, sideBarAcerca } from '../estilos/estilos'

export const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
 
  return (
    <nav className="sidebar"  style={sideBar}>
      <div className="sidebar-header">
        <Link className="navbar-brand text-white" to="/home">
          Home
        </Link>
        
      </div>
      <ul className="list-group list-group-flush">
          <li className="nav-item">
            <Link className="navbar-brand text-white" to="/acerca">
              Acerca de nosotros
            </Link>
          </li>
          <li className="nav-item">
            <Link className="navbar-brand text-white"  to="/auth/login">
              Iniciar sesión
            </Link>
          </li>
        </ul>
      <div className="sidebar-footer"></div>
    </nav>
  )
}