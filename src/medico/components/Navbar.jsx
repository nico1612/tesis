import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; // Usamos NavLink en lugar de Link
import { startLogout } from "../../store/auth/thunks";
import { FaSignOutAlt } from 'react-icons/fa';

export const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const location = useLocation();

  const logout = () => {
    dispatch(startLogout());
  };

  // Definimos las variables para los colores del fondo y del texto
  const bgColor = location.pathname === "/" ? "#f8f9fa" : "#007bff"; // Azul más claro cuando no hay coincidencia de ruta

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#07D2FE" }}
    >
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
         
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
                cerrar sesion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}