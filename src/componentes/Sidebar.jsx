import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <Link className="navbar-brand" to="/">
            <h1>Home</h1>
          </Link>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to="/dato" className={`nav-link ${location.pathname === '/dato' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUser} /> Datos personales
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/solicitudes" className={`nav-link ${location.pathname === '/solicitudes' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faFileAlt} /> Listado de solicitudes
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/relaciones" className={`nav-link ${location.pathname === '/relaciones' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faFileAlt} /> Relaciones
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer"></div>
      </nav>
    </div>
  );
};
