import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import './ImagenesUsuarios.css'
import CardImagen from '../../cardImagen/CardImagen'
import { ImagenesPaginacion } from '../../imagenesPaginacion/ImagenesPaginacion'

// Asegúrate de importar los componentes de Bootstrap necesarios
import { Modal, Button, Form } from 'react-bootstrap'

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
    const [showModal2,setShowModal2]=useState(false)
    const itemsPerPage = 2
    const [modificado,setModificado]=useState(true)

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
    }, [id, url, key,modificado]) 

    const indexOfLastItem = currentPage * itemsPerPage 
    const indexOfFirstItem = indexOfLastItem - itemsPerPage 
    const currentItems = consultas.slice(indexOfFirstItem, indexOfLastItem) 

    const paginate = (pageNumber) => setCurrentPage(pageNumber) 

    const handleCloseModal = () => {
        setShowModal(false) 
        setComentario('')  // Limpiar el comentario al cerrar el modal
    } 
    const handleCloseModal2=()=>{
        setShowModal2(false) 
        setComentario('')  // Limpiar el comentario al cerrar el modal
    }

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
                            <small className="form-text text-muted">
                                El tamaño máximo permitido para la imagen es de 1 MB.
                            </small>
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
                    <ImagenesPaginacion currentPage={currentPage} currentItems={currentItems} consultas={consultas} itemsPerPage={itemsPerPage} paginate={paginate} modificado={modificado} setModificado={setModificado} pacientr={true}/>
                </div>
            </div>

            {/* Modal de Bootstrap */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Comentario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formComentario">
                            <Form.Label>Comentario sobre la imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Agrega un comentario"
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Enviar Imagen y Comentario
                    </Button>
                </Modal.Footer>
            </Modal>
             {/* Modal de Bootstrap */}
             <Modal show={showModal2} onHide={handleCloseModal2}>
                <Modal.Header closeButton>
                    <Modal.Title>Análisis de Imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>El análisis de la imagen se ha completado. Recuerda que este análisis no reemplaza la consulta con un médico. Por favor, consulta a un profesional de la salud para obtener un diagnóstico adecuado.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal2}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    ) 
} 
