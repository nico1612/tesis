import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { FaCommentAlt, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export const Sidebar = () => {
  const { name } = useSelector((state) => state.auth);
  const bgColor = location.pathname === "/" ? "#f8f9fa" : "#007bff"; // Azul más claro cuando no hay coincidencia de ruta
  const textColor = location.pathname === "/" ? "#000" : "#fff"; // Texto negro cuando no hay coincidencia de ruta

  return (
    <div className="sidebar-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <Link className="navbar-brand" to="/">
            <h3 className="navbar-brand" style={{ color: textColor }}>
              <FaUser />    medico: {name}
            </h3>
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
              <Link
                className="nav-link"
                exact
                to="/historial"
                activeClassName="active"
              >
                <FaCommentAlt /> Historial
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                className="nav-link"
                exact
                to="/chat"
                activeClassName="active"
              >
                <FaCommentAlt /> Hablar con pacientes
              </Link>
            </li>
        </ul>
        <div className="sidebar-footer"></div>
      </nav>
    </div>
  );
};
