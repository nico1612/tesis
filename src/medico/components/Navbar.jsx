import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { startLogout } from "../../store/auth/thunks"
import { FaSignOutAlt } from 'react-icons/fa'

export const Navbar = () => {
  const dispatch = useDispatch()
  const { name } = useSelector((state) => state.auth)
  const location = useLocation()

  const logout = () => {
    dispatch(startLogout())
  }

  const bgColor = location.pathname === "/" ? "#f8f9fa" : "#007bff"

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#07D2FE" }}
    >
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
         
            <li className="nav-item">
              <button
                className="btn"
                style={{
                  backgroundColor: location.pathname === '/' ? '#007bff' : '#f8f9fa',
                  color: location.pathname === '/' ? '#fff' : '#000',
                }}
                onClick={logout}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}