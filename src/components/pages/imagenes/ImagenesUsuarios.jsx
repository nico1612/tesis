import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import './ImagenesUsuarios.css'
import CardImagen from '../../cardImagen/CardImagen'
import { ImagenesPaginacion } from '../../imagenesPaginacion/ImagenesPaginacion'

export const ImagenesUsuarios = () => {
    const { userId } = useSelector((state) => state.auth)
    const url = import.meta.env.VITE_APP_IP
    const key = import.meta.env.VITE_APP_SECRETORPRIVATEKEY
    const id = userId

    const [loading2, setLoading2] = useState(true)
    const [consultas, setConsultas] = useState([])
    const [estadisticas, setEstadisticas] = useState({})
    const [archivos, setArchivos] = useState([])
    const [encriptcion, setEncriptcion] = useState('')
    const [resultados, setResultados] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [error, setError] = useState(null)
    const itemsPerPage = 2

    const encriptarArchivo = (archivo) => {
        const reader = new FileReader()
        reader.readAsDataURL(archivo)
        reader.onload = () => {
            const base64Result = reader.result.split(",")[1]
            //const encrypted = CryptoJS.AES.encrypt(base64Result, key).toString()
            setEncriptcion(base64Result)
            console.log(base64Result)
        }
    }

    const subirArchivos = (e) => {
        const files = Array.from(e.target.files)
        setArchivos(files)
        files.forEach(encriptarArchivo)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (archivos.length === 0) {
            alert("Por favor selecciona una imagen")
            return
        }

        setLoading(true)

        const formData ={
            id:userId,
            encriptcion
        }

        try {
            console.log(formData)
            const response = await axios.put(`${url}/api/uploads/files/2`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            alert("Imagen enviada exitosamente.")

            const decryptedData = CryptoJS.AES.decrypt(response.data.img, key).toString(CryptoJS.enc.Utf8)
            response.data.img = decryptedData

            const { _id, ...datosSinId } = response.data
            setResultados(datosSinId)
            setArchivos([])
        } catch (error) {
            console.error("Error al enviar la imagen:", error.message)
            alert("Error al enviar la imagen.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchConsultasAndEstadisticas = async () => {
            try {
                const [consultasResponse, estadisticasResponse] = await Promise.all([
                    axios.get(`${url}/api/buscar/consulta/${id}`),
                    axios.get(`${url}/api/pacientes/estadisticas/${id}`)
                ])
                let { results } = consultasResponse.data
                results = results.map((result) => {
                    const decryptedData = CryptoJS.AES.decrypt(result.img, key).toString(CryptoJS.enc.Utf8)
                    return { ...result, img: decryptedData }
                })
                setConsultas(results)
                setEstadisticas(estadisticasResponse.data.resultados)
                setLoading2(false)
            } catch (error) {
                console.error("Error en la solicitud:", error.message)
                setLoading2(false)
                setError("Error al cargar los datos.")
                setConsultas([])
            }
        }
        fetchConsultasAndEstadisticas()
    }, [id, url, key])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = consultas.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="container">
            <div className='row'>
                <div className="form-container col-12">
                    <h2>Envío de Imágenes</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="imagen">Selecciona una imagen:</label>
                            <input
                                type="file"
                                id="imagen"
                                name="imagen"
                                accept="image/*"
                                required
                                className="form-control-file"
                                onChange={subirArchivos}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar Imagen</button>
                    </form>
                    {loading && <div className="text-center">Cargando...</div>}
                    {resultados && (
                        <div>
                            <CardImagen resultados={resultados} />
                        </div>
                    )}
                </div>
                <div className='col-12'>
            <h2>Historial de Imágenes</h2>
            {error && <div className="alert alert-danger">{error}</div>}
                <ImagenesPaginacion currentPage={currentPage} currentItems={currentItems} consultas={consultas} itemsPerPage={itemsPerPage}paginate={paginate}/>
            </div>
            </div>
        </div>
    )
}
