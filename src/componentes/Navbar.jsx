import React from 'react'
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { startLogout } from "../store/auth/thunks"

export const Navbar = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(startLogout())
  }

  return (
    <nav style={{background: "#07D2FE"}} className="navbar navbar-expand-lg ">
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li>
              <button className="btn btn-primary" onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}