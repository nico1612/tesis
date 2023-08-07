

export const TablaSolicitudes=({Aceptar,Rechazar,solicitudes})=>{

    return(
        <div className="container mt-4">
      <h2 className="text-center">Lista de Solicitudes</h2>
      <table className="table table-bordered mt-3">
        <thead className="thead-dark shadow">
          <tr>
            <th className="text-center" scope="col">Apellido</th>
            <th className="text-center" scope="col">Nombre</th>
            <th className="text-center" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes === null && (
            <tr>
              <td colSpan="3" className="text-center">No hay solicitudes</td>
            </tr>
          )}
          {Array.isArray(solicitudes) && solicitudes.length > 0 && (
            solicitudes.map(({ uid, apellido, nombre }) => (
              <tr key={uid}>
                <td className="text-center border-dark">{apellido}</td>
                <td className="text-center border-dark">{nombre}</td>
                <td className="text-center border-dark">
                  <button className="btn btn-success" onClick={() => Aceptar({ uid })}>Aceptar</button>
                  <button className="btn btn-danger ml-2" onClick={() => Rechazar({ uid })}>Rechazar</button>
                </td>
              </tr>
            ))
          )}
          {Array.isArray(solicitudes) && solicitudes.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    )
}