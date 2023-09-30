import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CryptoJS from "crypto-js"

export const HistorialPacientesPage = () => {
  const location = useLocation()
  const { id, nombre, apellido } = location.state
  const url = import.meta.env.VITE_APP_IP

  const [loading, setLoading] = useState(true)
  const [consultas, setConsultas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get(`${url}/api/buscar/consulta/${id}`)
        let {results} =response.data
        results.map((result)=>{
          var dencriptcion=CryptoJS.AES.decrypt(result.img,import.meta.env.VITE_APP_SECRETORPRIVATEKEY)
          console.log(dencriptcion)
          result.img=dencriptcion.toString(CryptoJS.enc.Utf8)
        })
        setConsultas(results)
        setLoading(false)
      } catch (error) {
        console.error("Error en la solicitud:", error.message)
        setLoading(false)
        setConsultas([])
      }
    }

    fetchConsultas()
  }, [id])

  const regresar = () => {
    navigate(-1)
  }

  return (
    <div className="container py-4">
      <h2 className="my-4">Historial de Consultas de {nombre} {apellido}</h2>
      <div className="row">
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : consultas.length > 0 ? (
          consultas.map((consulta) => (
            <div key={consulta._id} className="col-md-4 mb-4">
              <div className="card">
                <img src={consulta.img} className="card-img-top" alt="Consulta" />
                <div className="card-body">
                  <p className="card-text">Fecha: {consulta.dia}/{consulta.mes}/{consulta.ano}</p>
                  {consulta.resultadoDA >= 0.5 ? (
                    <p className="card-text">El área afectada tiene similitudes con un caso de dermatitis atópica.</p>
                  ) : (
                    <p className="card-text">El área afectada no coincide con dermatitis atópica.</p>
                  )}
                  {consulta.ResPsoriasis >= 0.5  ? (
                    <p className="card-text">El área afectada tiene similitudes con un caso de psoriasis.</p>
                  ) : (
                    <p className="card-text">El área afectada no coincide con psoriasis.</p>
                  )}
                  {consulta.ResDermatitisContacto >= 0.5  ? (
                    <p className="card-text">El área afectada tiene similitudes con un caso de dermatitis de contacto.</p>
                  ) : (
                    <p className="card-text">El área afectada no coincide con dermatitis de contacto.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-warning">No se encontraron consultas.</div>
        )}
      </div>
      <button className="btn btn-primary mt-3" onClick={regresar}>Regresar</button>
    </div>
  )
}