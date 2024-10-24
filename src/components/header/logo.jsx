import { Link } from "react-router-dom"
import logo from './logos.jpeg';

export const Logo=()=>{
    return(
        <Link className="navbar-brand" to="/homePaciente">
            <img src={logo} alt="Logo" style={{ width: '130px', marginRight: '10px' }} />
        </Link>
    )
}