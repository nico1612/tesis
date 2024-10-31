import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import './ImagenesUsuarios.css'
import CardImagen from '../../cardImagen/CardImagen'
import { ImagenesPaginacion } from '../../imagenesPaginacion/ImagenesPaginacion'

// Material UI imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Typography,
  Box
} from '@mui/material'

export const ImagenesUsuarios = () => {
    const { userId } = useSelector((state) => state.auth)
    const url = import.meta.env.VITE_APP_IP
    const key = import.meta.env.VITE_APP_SECRETORPRIVATEKEY
    const id = userId

    const [consultas, setConsultas] = useState([])
    const [archivos, setArchivos] = useState([])
    const [encriptcion, setEncriptcion] = useState('')
    const [resultados, setResultados] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [comentario, setComentario] = useState('')
    const [showModal2, setShowModal2] = useState(false)
    const itemsPerPage = 2
    const [modificado, setModificado] = useState(true)

    const MAX_FILE_SIZE = 1 * 1024 * 1024

    const encriptarArchivo = (archivo) => {
        const reader = new FileReader()
        reader.readAsDataURL(archivo)
        reader.onload = () => {
            const base64Result = reader.result.split(",")[1]
            setEncriptcion(base64Result)
        }
    }

    const subirArchivos = (e) => {
        const files = Array.from(e.target.files)
        const filteredFiles = files.filter((file) => {
            if (file.size > MAX_FILE_SIZE) {
                alert(`El archivo ${file.name} excede el tamaño máximo de 1 MB`)
                return false
            }
            return true
        })

        setArchivos(filteredFiles)
        filteredFiles.forEach(encriptarArchivo)
        setShowModal(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowModal(false)

        if (archivos.length === 0) {
            alert("Por favor selecciona una imagen")
            return
        }

        setLoading(true)

        const formData = {
            id: userId,
            encriptcion,
            comentario
        }

        try {
            const response = await axios.put(`${url}/api/uploads/files/2`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
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
            setShowModal2(true)
            setModificado(!modificado)
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
            } catch (error) {
                console.error("Error en la solicitud:", error.message)
                setError("Error al cargar los datos.")
                setConsultas([])
            }
        }
        fetchConsultasAndEstadisticas()
    }, [id, url, key, modificado])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = consultas.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleCloseModal = () => {
        setShowModal(false)
        setComentario('')
    }

    const handleCloseModal2 = () => {
        setShowModal2(false)
        setComentario('')
    }

    return (
        <div className="container">
            <div className='row' style={{justifyContent: "center"}}>
                <div className="form-container col-12" style={{width: "90%"}}>
                    <Typography variant="h4" style={{fontFamily: "DM Sans"}}>Envío de Imágenes</Typography>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            type="file"
                            id="imagen"
                            name="imagen"
                            accept="image/*"
                            required
                            onChange={subirArchivos}
                            helperText="El tamaño máximo permitido para la imagen es de 1 MB."
                        />
                        <Button type="submit" variant="contained" color="primary" style={{fontFamily: "DM Sans"}}>Enviar Imagen</Button>
                    </form>
                    {loading && (
                        <Box textAlign="center" mt={2}>
                            <CircularProgress />
                        </Box>
                    )}
                    {resultados && (
                        <div>
                            <CardImagen resultados={resultados} />
                        </div>
                    )}
                </div>
                <div className='col-12'>
                    <Typography variant="h4" style={{ color: "#fff", fontFamily: "DM Sans" }} >Historial de Imágenes</Typography>
                    {error && (
                        <Typography color="error">{error}</Typography>
                    )}
                    <ImagenesPaginacion
                        currentPage={currentPage}
                        currentItems={currentItems}
                        consultas={consultas}
                        itemsPerPage={itemsPerPage}
                        paginate={paginate}
                        modificado={modificado}
                        setModificado={setModificado}
                        pacientr={true}
                    />
                </div>
            </div>

            {/* Dialog for adding comments */}
            <Dialog open={showModal} onClose={handleCloseModal}>
                <DialogTitle>Agregar Comentario</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        id="comentario"
                        label="Comentario sobre la imagen"
                        type="text"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">Cancelar</Button>
                    <Button onClick={handleSubmit} color="primary">Enviar Imagen y Comentario</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for analysis completion */}
            <Dialog open={showModal2} onClose={handleCloseModal2}>
                <DialogTitle>Análisis de Imagen</DialogTitle>
                <DialogContent>
                    <Typography>El análisis de la imagen se ha completado. Recuerda que este análisis no reemplaza la consulta con un médico. Por favor, consulta a un profesional de la salud para obtener un diagnóstico adecuado.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal2} color="secondary">Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
