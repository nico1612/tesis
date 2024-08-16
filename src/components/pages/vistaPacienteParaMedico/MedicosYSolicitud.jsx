import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './MedicosYSolicitud.css'
import { MedicosBuscar } from '../MedicoBuscar/MedicoBuscar'
import { FormBuscar } from '../formBuscar/FormBuscar'
import { useForm } from '../../../hooks'

export const MedicosYSolicitud = () => {
    const { userId } = useSelector((state) => state.auth)
    const url = import.meta.env.VITE_APP_IP

    const [message, setMessage] = useState('')
    const [medicos, setMedicos] = useState([])
    const [resultadosBusqueda, setResultadosBusqueda] = useState([])
    const [hasSentRequest, setHasSentRequest] = useState(false)
    const [loading, setLoading] = useState(true)
    const { searchText, onInputChange } = useForm({ searchText: '' })

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const { data } = await axios.get(`${url}/api/buscar/relaciones/${userId}`)
                setMedicos(data.results)
                setLoading(false)
            } catch (error) {
                console.error("Error en la solicitud:", error.message)
                setLoading(false)
            }
        }

        fetchMedicos()
    }, [userId, url])

    const handleEliminar = async (medicoId) => {
        try {
            await axios.delete(`${url}/api/buscar/medicos/${medicoId}`)
            setMedicos(medicos.filter(medico => medico.id !== medicoId))
        } catch (error) {
            console.error("Error al eliminar el médico:", error.message)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.get(`${url}/api/buscar/medicos/${searchText}`)
            setResultadosBusqueda(response.data.results)
        } catch (error) {
            console.error('Error en la solicitud:', error.message)
            setResultadosBusqueda([])
        }
    }

    const mandarSolicitud = async (medico) => {
        try {
            const formData = {
                receptor: medico.uid,
                emisor: userId
            }
            await axios.post(`${url}/api/solicitud`, formData)
            setMessage('Solicitud enviada exitosamente.')
            setHasSentRequest(true)
        } catch (error) {
            console.error('Error en la solicitud:', error.message)
            setMessage('Error al enviar la solicitud.')
            setHasSentRequest(true)
        }
    }

    return (
        <div className="container">
            <div className="row">
                {/* Sección de Médicos Tratantes */}
                <div className="col-md-6">
                    <h1 className="title-medicos">Médicos Tratantes</h1>
                    {loading ? (
                        <p>Cargando médicos...</p>
                    ) : (
                        <ul className="list-group mt-3">
                            {medicos.map((medico) => (
                                <li className="list-group-item" key={medico.id}> {/* Asegúrate de que `medico.id` sea único */}
                                    <span>{medico.nombre}</span>
                                    <button className="btn-danger" onClick={() => handleEliminar(medico.id)}>
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="col-md-6">
                    <h1 className="text-center title-solicitud mb-4">Buscar y Enviar Solicitud a Médico</h1>
                    <FormBuscar onSubmit={onSubmit} searchText={searchText} onInputChange={(e)=>onInputChange(e)} />
                    {resultadosBusqueda.length > 0 && (
                        <div className="mt-4">
                            <h2>Resultados de la búsqueda:</h2>
                            <MedicosBuscar medicos={resultadosBusqueda} mandarSolicitud={(e)=>mandarSolicitud(e)} />
                        </div>
                    )}
                    {message && <p className={`mt-3 ${hasSentRequest ? 'text-success' : 'text-danger'}`}>{message}</p>}
                </div>
            </div>
        </div>
    )
}
