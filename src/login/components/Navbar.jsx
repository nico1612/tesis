import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-nav"> {/* Cambia la clase bg-light por bg-nav */}
      <div className="container">
        <Link className="navbar-brand " to="/home"> {/* Agrega la clase text-white */}
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/acerca"> {/* Agrega la clase text-white */}
                Acerca de nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/auth/login"> {/* Agrega la clase text-white */}
                Iniciar sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
