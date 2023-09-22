import React, { useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import CryptoJS from "crypto-js"

export const HomePage = () => {
  const { userId } = useSelector((state) => state.auth)
  const url = import.meta.env.VITE_APP_IP
  const key = import.meta.env.VITE_APP_SECRETORPRIVATEKEY
  const [encriptcion,setEncriptcion]=useState()
  const [archivos, setArchivos] = useState([])
  const [resultados, setResultados] = useState()
  const [base64,setBase64]=useState()
  const subirArchivos = (e) => {
    setArchivos(e.target.files)
    Array.from(e.target.files).forEach(archivo=>{
      var auxiliar=[]
      var reader=new FileReader()
      reader.readAsDataURL(archivo)
      reader.onload=function(){
        setBase64(reader.result)
        auxiliar=base64.split(",")
        setBase64(auxiliar[1])
        setEncriptcion(CryptoJS.AES.encrypt(base64,import.meta.env.VITE_APP_SECRETORPRIVATEKEY))
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!archivos) {
      alert("Por favor selecciona una imagen")
      return
    }

    const formData = new FormData()
    formData.append("id", userId)
    formData.append("encriptcion",encriptcion)
    try {
      const results = await axios.put(`${url}/api/uploads/files/2`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      alert("Imagen enviada exitosamente.")
      setArchivos([])
      console.log(results.data)
      const { _id, ...datosSinId } = results.data
      setResultados(datosSinId)
    } catch (error) {
      console.error("Error al enviar la imagen:", error.message)
      alert("Error al enviar la imagen.")
    }
  }

  return (
    <div className="container py-4">
      <h1 className="text-center my-4">Subir imágenes del área afectada</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="d-flex justify-content-center">
          <div className="input-group">
            <input
              type="file"
              name="files"
              className="form-control"
              multiple
              onChange={subirArchivos}
            />
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </div>
        </div>
      </form>
      {resultados && (
        <div className="container">
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="card-title mb-3">Resultado:</h2>
              <p className="card-text">
                Fecha: {resultados.dia}/{resultados.mes}/{resultados.ano}
              </p>
              {resultados.resultadoDA >= 0.5 ? (
                <p className="card-text">El área afectada tiene similitudes con un caso de dermatitis atópica.</p>
              ) : (
                <p className="card-text">El área afectada no coincide con dermatitis atópica.</p>
              )}
              {resultados.ResPsoriasis >= 0.5  ? (
                <p className="card-text">El área afectada tiene similitudes con un caso de psoriasis.</p>
              ) : (
                <p className="card-text">El área afectada no coincide con psoriasis.</p>
              )}
              {resultados.ResDermatitisContacto >= 0.5  ? (
                <p className="card-text">El área afectada tiene similitudes con un caso de dermatitis de contacto.</p>
              ) : (
                <p className="card-text">El área afectada no coincide con dermatitis de contacto.</p>
              )}
              <img
                src={resultados.img}
                alt="Consulta"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}