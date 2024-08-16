import { Link } from "react-router-dom"
import "./homePaciente.css"

export const HomePaciente = () => {
  return (
    <div className="container">
      <h1 className="mt-5">Bienvenido</h1>
      <p className="lead">Utiliza el siguiente menú para acceder a las diferentes funcionalidades del sistema.</p>

      <div className="menu">
        <div className="menu-item">
          <Link to="/imagenes" className="menu-link">
            <div className="menu-icon">&#128247;</div>
            <div className="menu-details">
              <h5 className="menu-title">Cargar Imágenes</h5>
              <p className="menu-text">Ver historial y carga de imágenes.</p>
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/medicos" className="menu-link">
            <div className="menu-icon">&#128104;&#8205;&#127973;</div>
            <div className="menu-details">
              <h5 className="menu-title">Médicos Tratantes</h5>
              <p className="menu-text">Consulta y gestiona tus médicos tratantes. Envía una solicitud a un médico.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

