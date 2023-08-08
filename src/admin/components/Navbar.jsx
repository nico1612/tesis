import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RiLogoutBoxLine, RiUserSearchLine, RiUserLine } from 'react-icons/ri'; // Importa los iconos que deseas utilizar
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
                <RiUserLine size={20} /> Pacientes
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/medicos" ? "active" : ""}`}>
              <Link className="nav-link" to="/medicos">
                <RiUserSearchLine size={20} /> Médicos
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={logout}>
                <RiLogoutBoxLine size={20} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
