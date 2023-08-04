export const BuscarPacientes=({ pacientes,mandarSolicitud})=>{
    return(
        <div>
          <h2 className="mt-4">Resultados de la búsqueda:</h2>
          {pacientes.map((paciente) => (
            <div key={paciente.uid} className="card mt-2"> {/* Agrega la propiedad key con un valor único, como el ID del paciente */}
              <div className="card-body">
                <h5 className="card-title">Nombre: {paciente.nombre}</h5>
                <p className="card-text">Apellido: {paciente.apellido}</p>
                <p className="card-text">Correo: {paciente.correo}</p>
                <button className="btn btn-secondary" onClick={() => mandarSolicitud({paciente})}>Agregar paciente</button>              </div>
            </div>
          ))}
        </div>
    )
}