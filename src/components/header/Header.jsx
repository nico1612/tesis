import { Link } from "react-router-dom"
import './Header.css'
import { Logo } from "./logo"

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Logo/>
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
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {/*<li className="nav-item">
                        <Link className="nav-link" to="/auth/quienes-somos">Quienes Somos</Link>
                    </li>*/}
                    <li className="nav-item">
                        <Link className="nav-link" to="/auth/iniciar-sesion">Iniciar Sesión</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
