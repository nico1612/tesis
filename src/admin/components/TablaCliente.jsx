export const TablaCliente=({pacientes,cambiarestado}) =>{

  return(
      <table className="table table-bordered table-sm">
      <thead className="table-primary">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Estado</th>
          <th scope="col">Cambiar Estado</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((paciente) => (
          <tr key={paciente.id}>
            <td>{paciente.nombre}</td>
            <td>{paciente.apellido}</td>
            <td className="text-center">
              <span
                className={`badge ${paciente.estado ? "bg-success" : "bg-danger"}`}
              >
                {paciente.estado ? "Activo" : "Inactivo"}
              </span>
            </td>
            <td className="text-center">
              <button
                className={`btn ${!paciente.estado ? "btn-success" : "btn-danger"}`}
                onClick={() => cambiarestado({ paciente })}
              >
                {paciente.estado ? "Desactivar" : "Activar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}