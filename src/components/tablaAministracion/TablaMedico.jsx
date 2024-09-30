import React from "react"
import "./TablaMedico.css" 

export const TablaMedico = ({ medicos, cambiarestado }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  return (
    <table className="table table-bordered table-sm">
      <thead className="table-primary">
        <tr>
          <th scope="col" className="text-center">Nombre</th>
          <th scope="col" className="text-center">Apellido</th>
          <th scope="col" className="text-center">Estado</th>
          <th scope="col" className="text-center">Licencia</th>
          <th scope="col" className="text-center">Cambiar Estado</th>
        </tr>
      </thead>
      <tbody>
        {medicos.map((medico) => (
          <tr key={medico.id}>
            <td className="text-center">{capitalizeFirstLetter(medico.nombre)}</td>
            <td className="text-center">{capitalizeFirstLetter(medico.apellido)}</td>
            <td className={`text-center badge ${medico.estado ? "bg-success text-white" : "bg-danger text-white"}`}>
              {medico.estado ? "Activo" : "Inactivo"}
            </td>
            <td className="text-center">{medico.licencia}</td>
            <td className="text-center">
              <button
                className={`btn ${!medico.estado ? "btn-success" : "btn-danger"}`}
                onClick={() => cambiarestado({ medico })}
              >
                {medico.estado ? "Desactivar" : "Activar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
