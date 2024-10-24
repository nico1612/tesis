import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap"

export const TablaImagen = ({ resultados, modificado, setModificado, paciente }) => {
  const [comentario, setComentario] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [showModal, setShowModal] = useState(false) // Control del modal
  const [modalImage, setModalImage] = useState('') // Imagen seleccionada para el modal
  const url = import.meta.env.VITE_APP_IP

  const handleComentarioChange = (e) => {
    setComentario(e.target.value)
  }

  const agregarComentario = async () => {
    try {
      const response = await fetch(`${url}/api/mensaje/consulta/${resultados._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(paciente ? { mensajePaciente: comentario } : { mensajeMedico: comentario })
        })
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el comentario')
      }

      const data = await response.json()
      setMensaje(data.message)
      setComentario('')
      setModificado(!modificado)
    } catch (error) {
      setMensaje(error.message)
    }
  }

  const handleImageClick = (imgSrc) => {
    setModalImage(imgSrc)
    setShowModal(true)
  }

  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <tr>
        <td>
          <img
            style={{ maxWidth: '100px', maxHeight: '150px', cursor: 'pointer' }}
            src={resultados.img}
            alt="Consulta"
            onClick={() => handleImageClick(resultados.img)} // Abre el modal con la imagen
          />
        </td>
        <td>{`${resultados.dia}/${resultados.mes}/${resultados.ano}`}</td>
        <td>
          {resultados.resultadosEnfermedades.map((enfermedad, index) => {
            if (enfermedad.enfermedad !== 'no ser ninguna enfermedad') {
              const resultado = (enfermedad.resultado * 100).toFixed(2).replace('.', ',')
              return (
                <div key={index}>
                  <p>Posible enfermedad: {enfermedad.enfermedad}</p>
                  <p>Precisión: {resultado}%</p>
                </div>
              )
            } else {
              return <p key={index}>No se detectó ninguna enfermedad.</p>
            }
          })}
        </td>
        <td>{resultados.mensajePaciente || 'No hay comentario disponible.'}</td>
        <td>{resultados.mensajeMedico || 'No hay comentario disponible.'}</td>
        <td>
          {!resultados.mensajePaciente && paciente && (
            <>
              <input
                type="text"
                value={comentario}
                onChange={handleComentarioChange}
                placeholder="Agregar comentario"
              />
              <button onClick={agregarComentario}>Enviar</button>
            </>
          )}
          {!resultados.mensajeMedico && !paciente && (
            <>
              <input
                type="text"
                value={comentario}
                onChange={handleComentarioChange}
                placeholder="Agregar comentario"
              />
              <button onClick={agregarComentario}>Enviar</button>
            </>
          )}
          {mensaje && <div className="alert alert-info">{mensaje}</div>}
        </td>
      </tr>

      {/* Modal para mostrar la imagen ampliada */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Imagen Ampliada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalImage} alt="Ampliada" style={{ width: '100%' }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
