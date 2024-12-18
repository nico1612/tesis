import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import './HistorialPacienteMedico.css'
import { ImagenesPaginacionDoctor } from '../../imagenesPaginacion/imagenesPaginationDoctor'

export const HistorialPacienteMedico = () => {
  const location = useLocation()
  const { id } = location.state
  const url = import.meta.env.VITE_APP_IP

  const [consultas, setConsultas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const consultasPorPagina = 2
  const [error, setError] = useState(null)
  const [modificado,setModificado]=useState(true)
  const itemsPerPage = 2

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = consultas.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get(`${url}/api/buscar/consulta/${id}`, {
          params: {
            page: currentPage,
            limit: consultasPorPagina,
          },
        })
        let { results, totalPages } = response.data
        results = results.map((result) => {
          const dencriptcion = CryptoJS.AES.decrypt(result.img, import.meta.env.VITE_APP_SECRETORPRIVATEKEY)
          result.img = dencriptcion.toString(CryptoJS.enc.Utf8)
          return result
        })
        setConsultas(results)
      } catch (error) {
        setError("Error en la solicitud: " + error.message)
        setConsultas([])
      }
    }

    fetchConsultas()
  }, [id, url, currentPage,modificado])

  const regresar = () => {
    navigate(-1)
  }

  return (
<div className="container">
  <h2 className="mt-5" style={{ color: "#fff" }}>Historial de Imágenes</h2>
  {error && <div className="alert alert-danger">{error}</div>}
  <div className="row mt-3 text-center"> {/* Añade text-center aquí */}
    <ImagenesPaginacionDoctor 
      modificado={modificado} 
      setModificado={setModificado} 
      error={error} 
      currentPage={currentPage} 
      currentItems={currentItems} 
      consultas={consultas} 
      itemsPerPage={itemsPerPage} 
      paginate={paginate} 
    />
    <div className="col-12"> {/* Envuelve el botón en un contenedor centrado */}
      <button className="btn btn-info mt-3" onClick={regresar}>Regresar</button>
    </div>
  </div>
</div>
  )
}
