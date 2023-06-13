import { Link } from "react-router-dom"


export const Navbar =()=>{

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link
                className="navbar-brand" 
                to="/"
            >
                home
            </Link>
            <div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse col-sm-4" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item col-sm-4">
                        <Link
                            className={(isActive)=>`nav-item nav-link ${isActive ? 'active':''}`}
                            to="/historial"
                        >
                            historial
                        </Link>
                    </li>
                    <li className="nav-item col-sm-4">
                        <Link
                            className={(isActive)=>`nav-item nav-link ${isActive ? 'active':''}`}
                            to="/buscar"
                        >
                            buscar medico
                        </Link>
                    </li>
                    <li className="nav-item col-sm-4">
                        <Link
                            className={(isActive)=>`nav-item nav-link ${isActive ? 'active':''}`}
                            to="/chat"
                        >
                            hablar medico
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}