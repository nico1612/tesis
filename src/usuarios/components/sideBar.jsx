import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos que deseas utilizar
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa la hoja de estilos de Bootstrap

export const Sidebar = () => {
  return (
    <nav className="sidebar bg-light">
      <div className="sidebar-header">
        <Link className="navbar-brand" to="/">
          <h1>Home</h1>
        </Link>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Link to="/dato" className="nav-link">
            <FontAwesomeIcon icon={faUser} /> Datos personales
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/relaciones" className="nav-link">
            <FontAwesomeIcon icon={faFileAlt} /> medicos
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
      </div>
    </nav>
  );
};