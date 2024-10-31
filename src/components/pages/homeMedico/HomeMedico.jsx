import { CardHome } from "../../cardHome/CardHome"
import './HomeMedico.css'

export const HomeMedico=()=>{
    return (
<div className="container">
    <div className="container2">
    <div className="content-container">
        <div className="home-title-medico">
            <h1 className="mt-5 titulo">Bienvenido, Doctor</h1>
            <p className="texto">Elija una de las opciones para acceder a las diferentes funcionalidades del sistema.</p>
        </div>

        <div className="row mt-4 containerCardHome">
            <CardHome
                title="Solicitud de Pacientes"
                text="Revisa y gestiona aquí las solicitudes de los pacientes."
                link="/doctorRequests"
                linkText="Ir"
            />
            <CardHome
                title="Pacientes que Trata"
                text="Consulta aquí la lista de pacientes que estás tratando."
                link="/doctorPatients"
                linkText="Ir"
            />
        </div>
    </div>
    </div>
</div>

    )
}