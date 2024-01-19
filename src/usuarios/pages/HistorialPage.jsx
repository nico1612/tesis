import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CryptoJS from "crypto-js"

export const HistorialPage = () => {
  const url = import.meta.env.VITE_APP_IP
  const { userId } = useSelector((state) => state.auth)
  const id = userId

  const [loading, setLoading] = useState(true)
  const [consultas, setConsultas] = useState([])
  const [estadisticas, setEstadisticas] = useState({})

  useEffect(() => {
    const fetchConsultasAndEstadisticas = async () => {
      try {
        const [consultasResponse, estadisticasResponse] = await Promise.all([
          axios.get(`${url}/api/buscar/consulta/${id}`),
          axios.get(`${url}/api/pacientes/estadisticas/${id}`)
        ])
        let {results} =consultasResponse.data

        results.map((result)=>{
          var dencriptcion=CryptoJS.AES.decrypt(result.img,import.meta.env.VITE_APP_SECRETORPRIVATEKEY)
          result.img=dencriptcion.toString(CryptoJS.enc.Utf8)
        })
        setConsultas(results)
        setEstadisticas(estadisticasResponse.data.resultados)
        setLoading(false)
      } catch (error) {
        console.error("Error en la solicitud:", error.message)
        setLoading(false)
        setConsultas([])
      }
    }

    fetchConsultasAndEstadisticas()

  }, [id, url])

  return (
    <div className=" py-4">
      <div style={{ backgroundColor: '#90e0ef'}} className="card p-4">
        <h2 className="mb-4 text-center">Tu historial</h2>
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : consultas.length > 0 ? (
          <div>
            <div className="mb-4 text-center" style={{background:"0077b6"}}>
              <h3>Estadísticas</h3>
              <p className="lead">
                <strong>Total de consultas:</strong> {estadisticas.total}
              </p>
              <div className="row">
                <div>
                  <table className="table table-bordered mt-3">
                    <thead className="thead-dark shadow ">
                      <tr>
                        <th className="text-center" scope="col">Enfermedad</th>
                        <th className="text-center" scope="col">Resultado</th>
                        <th className="text-center" scope="col">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center border-dark"> Psoriasis</td>
                        <td className="text-center border-dark">{estadisticas.psiorasis}</td>
                        <td className="text-center border-dark">{estadisticas.porcentajePsiorasis}</td>
                      </tr>
                      <tr>
                        <td className="text-center border-dark"> Dermatitis atópica </td>
                        <td className="text-center border-dark">{estadisticas.dermatitisAtopica}</td>
                        <td className="text-center border-dark">{estadisticas.porcentajeDermatitisAtopica}</td>
                      </tr>
                      <tr>
                        <td className="text-center border-dark"> Dermatitis de contacto</td>
                        <td className="text-center border-dark">{estadisticas.dermatitisDeContacto}</td>
                        <td className="text-center border-dark">{estadisticas.porcentajDermatitisDeContacto}</td>
                      </tr>
                      <tr>
                        <td className="text-center border-dark"> ninguno de los anteriores</td>
                        <td className="text-center border-dark">{estadisticas.otros}</td>
                        <td className="text-center border-dark">{estadisticas.porcentajeOtros}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <h4 className="text-primary">Consultas:</h4>
            <div className="row">
              {consultas.map((consulta) => (
                <div key={consulta._id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">
                        Fecha: {consulta.dia}/{consulta.mes}/{consulta.ano}
                      </p>
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
                      {consulta.img && (
                        <img style={{width:"200px",height:"200px"}} src={consulta.img} alt="Consulta" className="img-fluid" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="alert alert-warning text-center">No se encontraron consultas.</div>
        )}
      </div>
    </div>
  )
}