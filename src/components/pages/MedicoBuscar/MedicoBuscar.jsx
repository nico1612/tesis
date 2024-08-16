import './MedicosBuscar.css'

export const MedicosBuscar = ({ medicos, mandarSolicitud }) => {
    return (
        <>
            {medicos.map((medico) => (
                <div key={medico.uid} className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title">Nombre: {medico.nombre}</h5>
                        <p className="card-text">Apellido: {medico.apellido}</p>
                        <p className="card-text">Correo: {medico.correo}</p>
                        <button className="btn-secondary" onClick={() => mandarSolicitud(medico)}>
                            Agregar médico
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
