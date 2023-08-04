import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { startLogout } from "../../store/auth/thunks";

export const Navbar = () => {

  const location = useLocation();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
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
            <li className={`nav-item ${location.pathname === "/pacientes" ? "active" : ""}`}>
              <Link className="nav-link" to="/pacientes">
                Pacientes
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/medicos" ? "active" : ""}`}>
              <Link className="nav-link" to="/medicos">
                Médicos
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
