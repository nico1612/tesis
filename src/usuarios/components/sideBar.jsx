import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt, faHistory, faSearch, faComment } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos que deseas utilizar
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa la hoja de estilos de Bootstrap

export const Sidebar = ({ nombre, rol }) => {
  return (
    <nav style={{background: "#07D2FE"}} className="sidebar">
      <div className="sidebar-header">
        <Link className="navbar-brand" to="/">
        {rol}: {nombre}
        </Link>
      </div>
      <ul className="list-group list-group-flush">
        <li>
          <Link to="/dato" className="nav-link">
            <FontAwesomeIcon icon={faUser} /> Datos personales
          </Link>
        </li>
        <li>
          <Link to="/relaciones" className="nav-link">
            <FontAwesomeIcon icon={faFileAlt} /> Médicos
          </Link>
        </li>
        <li >
          <Link className="nav-link active" to="/buscar">
            <FontAwesomeIcon icon={faSearch} /> Buscar médico
          </Link>
        </li>
        <li >
          <Link className="nav-link active" to="/historial">
            <FontAwesomeIcon icon={faHistory} /> Historial
          </Link>
        </li>
        <li >
          <Link className="nav-link active" to="/chat">
            <FontAwesomeIcon icon={faComment} /> Chatear con médico
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
      </div>
    </nav>
  );
};