import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './PacientesMedicos.css'

export const PacienteMedico = () => {
  const { userId } = useSelector((state) => state.auth)
  const url = import.meta.env.VITE_APP_IP
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get(`${url}/api/pacientes/${userId}`)
        setPacientes(response.data.usuarios)
        setLoading(false)
      } catch (error) {
        console.error("Error en la solicitud:", error.message)
        setLoading(false)
        setPacientes([])
      }
    }

    fetchPacientes()
  }, [userId, url])

  const verHistorial = (usuario) => {
    const { nombre, apellido, uid } = usuario
    navigate(`/doctorPatients/${nombre}`, {
      state: { id: uid, nombre, apellido },
    })
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  

  return (
    <div className="container">
      <h1 className="mt-5">Pacientes que Trata</h1>
      <ul className="list-group mt-3">
        {pacientes && pacientes.length > 0 ? (
          pacientes.map((paciente) => (
            <li key={paciente.uid} className="list-group-item">
              <span>{capitalizeFirstLetter(paciente.nombre)} {capitalizeFirstLetter(paciente.apellido)}</span>
              <button
                className="btn btn-info btn-sm"
                onClick={() => verHistorial(paciente)}
              >
                Ver Historial
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No hay pacientes</li>
        )}
      </ul>
    </div>
  )
}
