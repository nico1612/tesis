import React from "react"
import { useSelector } from "react-redux"
import "./datoPage.css"

export const DatoPage = () => {
  const { consultas, name } = useSelector((state) => state.auth)

  return (
    <div className="dato-container container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h4>Paciente: {name}</h4>
          <h6>Consultas: {consultas}</h6>
        </div>
      </div>
    </div>
  )
}
