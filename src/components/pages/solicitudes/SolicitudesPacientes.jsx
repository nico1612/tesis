import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './SolicitudesPacientes.css'

export const SolicitudesPacientes = () => {
  const { userId } = useSelector((state) => state.auth)
  const [solicitudes, setSolicitudes] = useState([])
  const [cambio, setCambio] = useState(false)

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get(`${url}/api/buscar/solicitud/${userId}`)
        if (response.data.results.length > 0) {
          setSolicitudes(response.data.results)
        } else {
          setSolicitudes(null)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message)
        setSolicitudes([])
      }
    }

    fetchSolicitudes()
  }, [cambio, userId])

  const Aceptar = async ({ uid }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { emisor: uid, receptor: userId, estado: true, mandado: false },
    }
    await axios(`${url}/api/relacion`, options)
    setCambio(!cambio)
  }

  const Rechazar = async ({ uid }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { emisor: uid, receptor: userId, estado: false, mandado: false },
    }
    await axios(`${url}/api/relacion`, options)
    setCambio(!cambio)
  }

  return (
    <div className="container">
      <h1 className="mt-5" style={{ color: "#fff", fontFamily: "DM Sans" }}>Solicitud de Pacientes</h1>
      <ul className="list-group mt-3">
        {solicitudes && solicitudes.length > 0 ? (
          solicitudes.map((solicitud) => (
            <li key={solicitud.uid} className="list-group-item">
              <span>{solicitud.nombre}</span>
              <button
                className="btn btn-success btn-sm"
                onClick={() => Aceptar(solicitud)}
              >
                Aceptar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => Rechazar(solicitud)}
              >
                Rechazar
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No hay solicitudes pendientes</li>
        )}
      </ul>
    </div>
  )
}

