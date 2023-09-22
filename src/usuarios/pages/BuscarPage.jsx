import axios from 'axios'
import { useState } from 'react'
import { useForm } from '../../hooks'
import { useSelector } from 'react-redux'
import { FormBuscar, MedicosBuscar } from '../components'

const url=import.meta.env.VITE_APP_IP

export const BuscarPage = () => {
  const [medicos, setMedicos] = useState([])
  const [message, setMessage] = useState('')
  const [hasSentRequest, setHasSentRequest] = useState(false)

  const { userId} = useSelector((state) => state.auth)

  const { searchText, onInputChange } = useForm({
    searchText: ''
  })

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(searchText)
    try {
      const response = await axios.get(`${url}/api/buscar/medicos/${searchText}`)
      console.log(response.data)
      setMedicos(response.data.results)
    } catch (error) {
      console.error('Error en la solicitud:', error.message)
      setMedicos([])
    }
  }

  const mandarSolicitud= async ({medico})=>{

    const formData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { "receptor": medico.uid, "emisor": userId }
    }
  
    try {
      const response = await axios(`${url}/api/solicitud`, formData)
      console.log(response.data)
      setMessage('Solicitud enviada exitosamente.')
      setHasSentRequest(true)
    } catch (error) {
      console.error('Error en la solicitud:', error.message)
      setMessage('Ya has mandado una solicitud.')
      setHasSentRequest(true)
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Buscar médico</h1>
          <FormBuscar onSubmit={onSubmit} searchText={searchText} onInputChange={onInputChange}/>
            {medicos.length === 0 ? null : (
              <div className="mt-4">
                <h2>Resultados de la búsqueda:</h2>
                <MedicosBuscar medicos={medicos} mandarSolicitud={mandarSolicitud}/>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}