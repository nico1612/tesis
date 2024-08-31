import { CardHome } from "../../cardHome/CardHome"

export const HomeMedico=()=>{
    return (
        <div className="container">
            <h1 className="mt-5">Bienvenido, Doctor</h1>
            <p>Elija una de las opciones para acceder a las diferentes funcionalidades del sistema.</p>
    
            <div className="row mt-4">
            <CardHome
                title="Solicitud de Pacientes"
                text="Revisa y gestiona aquí las solicitudes de los pacientes."
                link="doctorRequests"
                linkText="Ir"
            />
            <CardHome
                title="Pacientes que Trata"
                text="Consulta aquí la lista de pacientes que estás tratando."
                link="doctorPatients"
                linkText="Ir"
            />
            </div>
        </div>
    )
}