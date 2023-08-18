import React from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHistory, faSearch, faComment } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos que deseas utilizar
import { startLogout } from "../store/auth/thunks";

export const Navbar = ({ nombre, rol }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
        <h3>{rol}: {nombre}</h3>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/historial">
                <FontAwesomeIcon icon={faHistory} /> Historial
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/buscar">
                <FontAwesomeIcon icon={faSearch} /> Buscar médico
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/chat">
                <FontAwesomeIcon icon={faComment} /> Hablar con médico
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
