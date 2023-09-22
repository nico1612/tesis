import React from "react"
import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { RiLogoutBoxLine } from 'react-icons/ri'
import { startLogout } from "../../store/auth/thunks"
import { navbar } from "../estilos/componentes"

export const Navbar = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(startLogout())
  }

  return (
    <nav style={navbar} className="navbar navbar-expand-lg navbar-light">
      <div className="container">
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-primary" onClick={logout}>
                <RiLogoutBoxLine size={20} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}