import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import './cardImagen.css'

export const CardImagen = ({ resultados,modificado,setModificado,paciente }) => {
  const [comentario, setComentario] = useState('')
  const [mensaje, setMensaje] = useState('')
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

  return (
    <Card style={{ maxWidth: '500px', margin: '0 auto' }} className="mb-3">
      <Card.Body className="card-body">
        <div className="card-img-container">
          <Card.Img
            style={{ maxWidth: '200px', maxHeight: '1500px', margin: '0 auto' }}
            variant="top"
            src={resultados.img}
            alt="Consulta"
            className="card-img"
          />
        </div>
        <div className="card-content">
          <Card.Title className="card-title">Resultado:</Card.Title>
          <Card.Text>
            Fecha: {resultados.dia}/{resultados.mes}/{resultados.ano}
          </Card.Text>
          {resultados.resultadosEnfermedades.map((enfermedad, index) => {
            if (enfermedad.enfermedad !== 'no ser ninguna enfermedad') {
              let resultado = enfermedad.resultado * 100
              let resultadoFormateado = resultado.toFixed(2).replace('.', ',')

              return (
                <div key={index}>
                  <Card.Text>
                    El área afectada tiene más probabilidad de ser {enfermedad.enfermedad}.
                  </Card.Text>
                  <Card.Text>
                    Con un porcentaje de {resultadoFormateado}% precisión.
                  </Card.Text>
                </div>
              )
            } else {
              return (
                <Card.Text key={index}>
                  No se ha detectado ninguna enfermedad en el área enviada.
                </Card.Text>
              )
            }
          })}
          <Card.Text>
            Comentario {paciente?'tuyo':'paciente'}: {resultados.mensajePaciente || 'No hay comentario disponible.'}
          </Card.Text>
          <Card.Text>
            Comentario {!paciente?'tuyo':'medico'}: {resultados.mensajeMedico || 'No hay comentario disponible.'}
          </Card.Text>

          {!resultados.mensajePaciente && paciente && (
            <>
              <input
                type="text"
                value={comentario}
                onChange={handleComentarioChange}
                placeholder="Agregar comentario"
              />
              <button onClick={agregarComentario}>Enviar Comentario</button>
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
              <button onClick={agregarComentario}>Enviar Comentario</button>
            </>
          )}
          {/* Mostrar mensaje de éxito o error */}
          {mensaje && <div className="alert alert-info">{mensaje}</div>}
        </div>
      </Card.Body>
    </Card>
  )
}

export default CardImagen
