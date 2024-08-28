import React from 'react'
import Card from 'react-bootstrap/Card'
import './cardImagen.css'

export const CardImagen = ({ resultados }) => {
  console.log(resultados.resultadosEnfermedades[0].enfermedad)
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
              <Card.Text>
              el area afectada tiene más probabilidad de ser {enfermedad.enfermedad} 
              </Card.Text>
             <Card.Text>
             con un porcentaje de {enfermedad.resultado*100} presicion
             </Card.Text>
            </Card.Text>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}



export default CardImagen
