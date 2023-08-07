import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../store/auth/thunks";

export const Navbar = ({nombre,rol}) => {

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
        <h3>{rol}:</h3>
        <h4>{nombre}</h4>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/historial">
                Historial
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/buscar">
                Buscar médico
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat">
                Hablar con médico
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};