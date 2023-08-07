import React from 'react';
import { Link } from 'react-router-dom';
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
            <i className="fas fa-user"></i> Datos personales
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/solicitudes" className="nav-link">
            <i className="fas fa-file-alt"></i> Solicitudes
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
      </div>
    </nav>
  );
};
