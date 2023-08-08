import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom"; // Usamos NavLink en lugar de Link
import { startLogout } from "../../store/auth/thunks";
import { FaUser, FaCommentAlt, FaSignOutAlt } from 'react-icons/fa';

export const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const location = useLocation();

  const logout = () => {
    dispatch(startLogout());
  };

  // Definimos las variables para los colores del fondo y del texto
  const bgColor = location.pathname === "/" ? "#f8f9fa" : "#007bff"; // Azul más claro cuando no hay coincidencia de ruta
  const textColor = location.pathname === "/" ? "#000" : "#fff"; // Texto negro cuando no hay coincidencia de ruta

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container">
        <h3 className="navbar-brand" style={{ color: textColor }}>
          <FaUser /> medico:
        </h3>
        <h4 className="navbar-brand" style={{ color: textColor }}>
          {name}
        </h4>
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
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/historial"
                activeClassName="active"
              >
                <FaCommentAlt /> Historial
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/chat"
                activeClassName="active"
              >
                <FaCommentAlt /> Hablar con pacientes
              </NavLink>
            </li>
            <li className="nav-item">
              {/* Utilizamos solo el ícono de logout sin texto */}
              <button
                className="btn"
                style={{
                  backgroundColor: location.pathname === '/' ? '#007bff' : '#f8f9fa',
                  color: location.pathname === '/' ? '#fff' : '#000',
                }}
                onClick={logout}
              >
                <FaSignOutAlt />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}