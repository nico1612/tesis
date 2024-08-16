import React from 'react'
import Card from 'react-bootstrap/Card'
import './cardImagen.css'

export const CardImagen = ({ resultados }) => {
  return (
    <Card style={{ maxWidth: '500px', margin: '0 auto' }} className="mb-3">
      <Card.Body className="card-body">
        <div className="card-img-container">
          <Card.Img
           style={{ maxWidth: '200px',maxHeight:'1500px' ,margin: '0 auto' }}
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
          {resultados.resultadosEnfermedades.map((enfermedad, index) => (
            <Card.Text key={index}>
              {enfermedad.resultado >= 0.5
                ? `la evaluación mediante Machine Learning sugiere que el área afectada presenta patrones similares a los de la ${enfermedad.enfermedad}.`
                : `la evaluación mediante Machine Learning sugiere que el área afectada no presenta patrones similares a los de la ${enfermedad.enfermedad}.`}
            </Card.Text>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}



export default CardImagen
